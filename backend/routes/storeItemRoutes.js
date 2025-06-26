const express = require("express");
const router = express.Router();
const storeItemController = require("../controllers/storeItemController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const {
  createStoreItemSchema,
  updateStoreItemSchema,
} = require("../validators/storeItemValidator");

router.post(
  "/items",
  protect,
  authorize("SuperAdmin", "KitchenStaff"),
  validate(createStoreItemSchema),
  storeItemController.createItem
);
router.get("/items", protect, storeItemController.getAllItems);
router.put(
  "/items/:id",
  protect,
  authorize("SuperAdmin", "KitchenStaff"),
  validate(updateStoreItemSchema),
  storeItemController.updateItem
);
router.delete(
  "/items/:id",
  protect,
  authorize("SuperAdmin"),
  storeItemController.deleteItem
);

module.exports = router;
