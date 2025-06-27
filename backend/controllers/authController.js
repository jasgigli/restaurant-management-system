import jwt from "jsonwebtoken";
import userRepository from "../data/userRepository.js";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });
};

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const allowedRoles = ["admin", "manager", "staff", "SuperAdmin", "HR"];
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({
          message: "All fields (name, email, password, role) are required.",
        });
    }
    if (!allowedRoles.includes(role)) {
      return res
        .status(400)
        .json({
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
    setTokenCookie(res, token);
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
    const { email, password } = req.body;
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
    setTokenCookie(res, token);
    res.json({ user, token });
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
  res.json({ message: "Logged out successfully" });
}
