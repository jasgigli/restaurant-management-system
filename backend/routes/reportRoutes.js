const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const { protect, authorize } = require("../middleware/authMiddleware");

// GET /api/reports/net-profit?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get(
  "/net-profit",
  protect,
  authorize("SuperAdmin", "Moderator"),
  reportController.getNetProfit
);

module.exports = router;
