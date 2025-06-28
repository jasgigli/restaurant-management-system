import express from "express";
import {
  forget,
  login,
  logout,
  refresh,
  register,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/forget", forget);
router.post("/refresh", refresh);

export default router;
