import jwt from "jsonwebtoken";
import userRepository from "../data/userRepository.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
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
    maxAge: 1000 * 60 * 60 * 24, // 1 day
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
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields (name, email, password, role) are required.",
      });
    }
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
      user,
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
    const userInstance = await userRepository.findByEmail(email); // returns Sequelize instance
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
    res.json({ user, token });
  } catch (error) {
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
    const user = await userRepository.findByEmail(decoded.email || decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const safeUser = await userRepository.getUserSafe(user);
    const newToken = generateToken(safeUser);
    setTokenCookie(res, newToken);
    res.json({ token: newToken });
  } catch (error) {
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

export function forget(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ message: "passowrd reset" });
}
