import express from "express";
import * as saleController from "../controllers/saleController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { createSaleSchema } from "../schemas/sale.schema.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("SuperAdmin", "Sales"),
  validate(createSaleSchema),
  saleController.createSale
);
router.get(
  "/",
  protect,
  authorize("SuperAdmin", "Moderator"),
  saleController.getSalesReport // supports ?page=1&limit=10
);

export default router;
