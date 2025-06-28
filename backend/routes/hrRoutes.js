import express from "express";
import multer from "multer";
import path from "path";
import * as hrController from "../controllers/hrController.js";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Employees
router.post(
  "/employees",
  authMiddleware,
  authorize("SuperAdmin", "HR"),
  hrController.createEmployee
);
router.get(
  "/employees",
  authMiddleware,
  authorize("SuperAdmin", "HR"),
  hrController.getEmployees
);
router.put(
  "/employees/:id",
  authMiddleware,
  authorize("SuperAdmin", "HR"),
  hrController.updateEmployee
);
router.delete(
  "/employees/:id",
  authMiddleware,
  authorize("SuperAdmin"),
  hrController.deleteEmployee
);

// Attendance
router.post(
  "/attendance",
  authMiddleware,
  authorize("SuperAdmin", "HR"),
  hrController.createAttendance
);
router.get(
  "/attendance",
  authMiddleware,
  authorize("SuperAdmin", "HR"),
  hrController.getAttendance
);

// Salary Advance
router.post(
  "/salary-advance",
  authMiddleware,
  authorize("SuperAdmin", "HR"),
  hrController.createAdvance
);
router.get(
  "/salary-advance",
  authMiddleware,
  authorize("SuperAdmin", "HR"),
  hrController.getAdvances
);

// Staff list (for HR/Admin)
router.get(
  "/staff",
  authMiddleware,
  authorize("SuperAdmin", "HR"),
  hrController.getStaff
);

export default router;
