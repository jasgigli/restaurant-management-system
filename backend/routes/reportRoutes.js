import express from "express";
import * as reportController from "../controllers/reportController.js";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
// import { reportSchema } from '../schemas/report.schema.js'; // Placeholder for future schemas

const router = express.Router();

// GET /api/reports/net-profit?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get(
  "/net-profit",
  authMiddleware,
  authorize("SuperAdmin", "Moderator"),
  reportController.getNetProfit
);

router.get(
  "/reports/sales",
  authMiddleware,
  authorize("SuperAdmin", "Manager"),
  reportController.getSalesReport
);
router.get(
  "/reports/inventory",
  authMiddleware,
  authorize("SuperAdmin", "Manager"),
  reportController.getInventoryReport
);
router.get(
  "/reports/analytics",
  authMiddleware,
  authorize("SuperAdmin", "Manager"),
  reportController.getAnalyticsReport
);

export default router;
