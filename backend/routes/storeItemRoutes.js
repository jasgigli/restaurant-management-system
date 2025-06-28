import express from "express";
import * as storeItemController from "../controllers/storeItemController.js";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import {
  createStoreItemSchema,
  updateStoreItemSchema,
} from "../schemas/storeItem.schema.js";
// import { createStoreItemSchema, updateStoreItemSchema } from '../schemas/storeItem.schema.js'; // Placeholder for future schemas

const router = express.Router();

router.post(
  "/store-items",
  authMiddleware,
  authorize("SuperAdmin"),
  validate(createStoreItemSchema),
  storeItemController.createStoreItem
);
router.get(
  "/store-items",
  authMiddleware,
  authorize("SuperAdmin"),
  storeItemController.getStoreItems
);
router.put(
  "/store-items/:id",
  authMiddleware,
  authorize("SuperAdmin"),
  validate(updateStoreItemSchema),
  storeItemController.updateStoreItem
);
router.delete(
  "/store-items/:id",
  authMiddleware,
  authorize("SuperAdmin"),
  storeItemController.deleteStoreItem
);

export default router;
