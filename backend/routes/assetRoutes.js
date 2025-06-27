import express from "express";
import * as assetController from "../controllers/assetController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import {
  createAssetSchema,
  updateAssetSchema,
} from "../schemas/asset.schema.js";

const router = express.Router();

// Restaurant Assets
router.post(
  "/assets",
  protect,
  authorize("SuperAdmin"),
  validate(createAssetSchema),
  assetController.createAsset
);
router.get(
  "/assets",
  protect,
  authorize("SuperAdmin"),
  assetController.getAssets
);
router.put(
  "/assets/:id",
  protect,
  authorize("SuperAdmin"),
  validate(updateAssetSchema),
  assetController.updateAsset
);
router.delete(
  "/assets/:id",
  protect,
  authorize("SuperAdmin"),
  assetController.deleteAsset
);

// Staff Assigned Items
router.post(
  "/assigned-items",
  protect,
  authorize("SuperAdmin"),
  assetController.createAssignedItem
);
router.get(
  "/assigned-items",
  protect,
  authorize("SuperAdmin"),
  assetController.getAssignedItems
);

export default router;
