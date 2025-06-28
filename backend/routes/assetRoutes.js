import express from "express";
import * as assetController from "../controllers/assetController.js";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import {
  createAssetSchema,
  updateAssetSchema,
} from "../schemas/asset.schema.js";

const router = express.Router();

// Restaurant Assets
router.post(
  "/assets",
  authMiddleware,
  authorize("SuperAdmin"),
  validate(createAssetSchema),
  assetController.createAsset
);
router.get(
  "/assets",
  authMiddleware,
  authorize("SuperAdmin"),
  assetController.getAssets
);
router.put(
  "/assets/:id",
  authMiddleware,
  authorize("SuperAdmin"),
  validate(updateAssetSchema),
  assetController.updateAsset
);
router.delete(
  "/assets/:id",
  authMiddleware,
  authorize("SuperAdmin"),
  assetController.deleteAsset
);

// Staff Assigned Items
router.post(
  "/assigned-items",
  authMiddleware,
  authorize("SuperAdmin"),
  assetController.createAssignedItem
);
router.get(
  "/assigned-items",
  authMiddleware,
  authorize("SuperAdmin"),
  assetController.getAssignedItems
);

export default router;
