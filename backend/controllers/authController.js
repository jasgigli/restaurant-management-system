import jwt from "jsonwebtoken";
import userRepository from "../data/userRepository.js";
import { AppError } from "../utils/appError.js";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    const user = await userRepository.createUser({ name, email, password, role });
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Re-fetch as Sequelize instance for password check
    const userInstance = await import("../models/user.js").then(m => m.default.findOne({ where: { email } }));
    const isMatch = await userInstance.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
