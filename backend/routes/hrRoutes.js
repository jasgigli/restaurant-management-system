const express = require("express");
const router = express.Router();
const hrController = require("../controllers/hrController");
const { protect, authorize } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const validate = require("../middleware/validate");
const {
  createEmployeeSchema,
  updateEmployeeSchema,
} = require("../validators/hrValidator");

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
  validate(createEmployeeSchema),
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
  validate(updateEmployeeSchema),
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
router.put(
  "/attendance/:id",
  protect,
  authorize("SuperAdmin", "HR"),
  hrController.updateAttendance
);
router.delete(
  "/attendance/:id",
  protect,
  authorize("SuperAdmin", "HR"),
  hrController.deleteAttendance
);

// Salary Advances
router.post(
  "/advances",
  protect,
  authorize("SuperAdmin", "HR"),
  hrController.createAdvance
);
router.get(
  "/advances",
  protect,
  authorize("SuperAdmin", "HR"),
  hrController.getAdvances
);
router.put(
  "/advances/:id",
  protect,
  authorize("SuperAdmin", "HR"),
  hrController.updateAdvance
);
router.delete(
  "/advances/:id",
  protect,
  authorize("SuperAdmin", "HR"),
  hrController.deleteAdvance
);

// PUT /api/employees/:id/photo
router.put(
  "/employees/:id/photo",
  protect,
  authorize("SuperAdmin", "HR"),
  upload.single("photo"),
  hrController.uploadPhoto
);

module.exports = router;
