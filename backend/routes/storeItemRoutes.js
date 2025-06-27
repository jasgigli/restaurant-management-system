import express from "express";
import * as storeItemController from "../controllers/storeItemController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
// import { createStoreItemSchema, updateStoreItemSchema } from '../schemas/storeItem.schema.js'; // Placeholder for future schemas

const router = express.Router();

router.post(
  "/items",
  protect,
  authorize("SuperAdmin", "KitchenStaff"),
  storeItemController.createStoreItem
);
router.get("/items", protect, storeItemController.getStoreItems);
router.put(
  "/items/:id",
  protect,
  authorize("SuperAdmin", "KitchenStaff"),
  storeItemController.updateStoreItem
);
router.delete(
  "/items/:id",
  protect,
  authorize("SuperAdmin"),
  storeItemController.deleteStoreItem
);

export default router;
