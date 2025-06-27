import express from "express";
import multer from "multer";
import path from "path";
import * as hrController from "../controllers/hrController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

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
  protect,
  authorize("SuperAdmin", "HR"),
  hrController.createEmployee
);
router.get(
  "/employees",
  protect,
  authorize("SuperAdmin", "HR"),
  hrController.getEmployees
);
router.put(
  "/employees/:id",
  protect,
  authorize("SuperAdmin", "HR"),
  hrController.updateEmployee
);
router.delete(
  "/employees/:id",
  protect,
  authorize("SuperAdmin", "HR"),
  hrController.deleteEmployee
);

// Attendance
router.post(
  "/attendance",
  protect,
  authorize("SuperAdmin", "HR"),
  hrController.createAttendance
);
router.get(
  "/attendance",
  protect,
  authorize("SuperAdmin", "HR"),
  hrController.getAttendance
);

export default router;
