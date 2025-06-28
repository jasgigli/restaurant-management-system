import express from "express";
import * as saleController from "../controllers/saleController.js";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { createSaleSchema, updateSaleSchema } from "../schemas/sale.schema.js";

const router = express.Router();

router.post(
  "/sales",
  authMiddleware,
  authorize("SuperAdmin", "Cashier"),
  validate(createSaleSchema),
  saleController.createSale
);
router.get(
  "/sales",
  authMiddleware,
  authorize("SuperAdmin", "Cashier"),
  saleController.getSales
);
router.put(
  "/sales/:id",
  authMiddleware,
  authorize("SuperAdmin", "Cashier"),
  validate(updateSaleSchema),
  saleController.updateSale
);
router.delete(
  "/sales/:id",
  authMiddleware,
  authorize("SuperAdmin"),
  saleController.deleteSale
);

export default router;
