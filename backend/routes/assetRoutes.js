const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const {
  createAssetSchema,
  updateAssetSchema,
} = require("../validators/assetValidator");

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
router.put(
  "/assigned-items/:id",
  protect,
  authorize("SuperAdmin"),
  assetController.updateAssignedItem
);
router.delete(
  "/assigned-items/:id",
  protect,
  authorize("SuperAdmin"),
  assetController.deleteAssignedItem
);

module.exports = router;
