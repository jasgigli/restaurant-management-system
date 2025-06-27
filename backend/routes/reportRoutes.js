import express from "express";
import * as reportController from "../controllers/reportController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
// import { reportSchema } from '../schemas/report.schema.js'; // Placeholder for future schemas

const router = express.Router();

// GET /api/reports/net-profit?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get(
  "/net-profit",
  protect,
  authorize("SuperAdmin", "Moderator"),
  reportController.getNetProfit
);

export default router;
