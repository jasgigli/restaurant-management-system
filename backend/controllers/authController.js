import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import userRepository from "../data/userRepository.js";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schemas/auth.schema.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    }
  );
};

const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 15, // 15 minutes
  });
};

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};

export async function register(req, res) {
  try {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: parseResult.error.errors.map((e) => e.message).join(", "),
      });
    }

    const { name, email, password, role } = parseResult.data;
    const allowedRoles = ["admin", "staff", "hr"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: `Invalid role. Allowed roles: ${allowedRoles.join(", ")}`,
      });
    }

    const userExists = await userRepository.findByEmail(email, { raw: true });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await userRepository.createUser({
      name,
      email,
      password,
      role,
    });

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    setTokenCookie(res, token);
    setRefreshTokenCookie(res, refreshToken);

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: parseResult.error.errors.map((e) => e.message).join(", "),
      });
    }

    const { email, password } = parseResult.data;
    const userInstance = await userRepository.findByEmail(email);

    if (!userInstance) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await userInstance.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = await userRepository.getUserSafe(userInstance);
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    setTokenCookie(res, token);
    setRefreshTokenCookie(res, refreshToken);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
}

export async function refresh(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }

    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const safeUser = await userRepository.getUserSafe(user);
    const newToken = generateToken(safeUser);
    const newRefreshToken = generateRefreshToken(safeUser);

    setTokenCookie(res, newToken);
    setRefreshTokenCookie(res, newRefreshToken);

    res.json({
      token: newToken,
      user: {
        id: safeUser.id,
        name: safeUser.name,
        email: safeUser.email,
        role: safeUser.role,
      },
    });
  } catch (error) {
    console.error("Refresh error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
}

export async function forgotPassword(req, res) {
  try {
    const parseResult = forgotPasswordSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: parseResult.error.errors.map((e) => e.message).join(", "),
      });
    }

    const { email } = parseResult.data;
    const user = await userRepository.findByEmail(email);

    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store reset token in user record
    await userRepository.updateResetToken(
      user.id,
      resetToken,
      resetTokenExpiry
    );

    // In a real application, you would send an email here
    // For now, we'll just return the token (in production, send via email)
    const resetUrl = `${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }/reset-password?token=${resetToken}`;

    res.json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
      resetUrl, // Remove this in production
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
}

export async function resetPassword(req, res) {
  try {
    const parseResult = resetPasswordSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: parseResult.error.errors.map((e) => e.message).join(", "),
      });
    }

    const { token, password } = parseResult.data;

    // Find user by reset token
    const user = await userRepository.findByResetToken(token);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Check if token is expired
    if (user.resetTokenExpiry < new Date()) {
      return res.status(400).json({ message: "Reset token has expired" });
    }

    // Update password and clear reset token
    const hashedPassword = await bcrypt.hash(password, 12);
    await userRepository.updatePasswordAndClearResetToken(
      user.id,
      hashedPassword
    );

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
}

export async function verifyResetToken(req, res) {
  try {
    const { token } = req.params;

    const user = await userRepository.findByResetToken(token);
    if (!user) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    if (user.resetTokenExpiry < new Date()) {
      return res.status(400).json({ message: "Reset token has expired" });
    }

    res.json({ message: "Valid reset token" });
  } catch (error) {
    console.error("Verify reset token error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
}

export function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ message: "Logged out successfully" });
}

export async function me(req, res) {
  try {
    const user = await userRepository.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const safeUser = await userRepository.getUserSafe(user);
    res.json({
      user: {
        id: safeUser.id,
        name: safeUser.name,
        email: safeUser.email,
        role: safeUser.role,
      },
    });
  } catch (error) {
    console.error("Me error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
}
