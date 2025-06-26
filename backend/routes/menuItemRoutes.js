const express = require("express");
const router = express.Router();
const menuItemController = require("../controllers/menuItemController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const {
  createMenuItemSchema,
  updateMenuItemSchema,
} = require("../validators/menuItemValidator");

router.post(
  "/items",
  protect,
  authorize("SuperAdmin"),
  validate(createMenuItemSchema),
  menuItemController.createMenuItem
);
router.post(
  "/items/:id/ingredients",
  protect,
  authorize("SuperAdmin"),
  menuItemController.addIngredients
);
router.get("/items", protect, menuItemController.getAllMenuItems);

// GET /api/menu-items
router.get(
  "/",
  protect,
  authorize("SuperAdmin", "MenuManager"),
  menuItemController.getMenuItems
); // supports ?page=1&limit=10
// PUT /api/menu-items/:id
router.put(
  "/:id",
  protect,
  authorize("SuperAdmin", "MenuManager"),
  validate(updateMenuItemSchema),
  menuItemController.updateMenuItem
);
// DELETE /api/menu-items/:id
router.delete(
  "/:id",
  protect,
  authorize("SuperAdmin", "MenuManager"),
  menuItemController.deleteMenuItem
);

module.exports = router;
