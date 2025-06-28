import express from "express";
import * as menuItemController from "../controllers/menuItemController.js";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import {
  createMenuItemSchema,
  updateMenuItemSchema,
} from "../schemas/menuItem.schema.js";

const router = express.Router();

router.post(
  "/menu-items",
  authMiddleware,
  authorize("SuperAdmin", "KitchenStaff"),
  validate(createMenuItemSchema),
  menuItemController.createMenuItem
);
router.post(
  "/items/:id/ingredients",
  authMiddleware,
  authorize("SuperAdmin"),
  menuItemController.addIngredients
);
router.get(
  "/menu-items",
  authMiddleware,
  authorize("SuperAdmin", "KitchenStaff"),
  menuItemController.getMenuItems
);

// GET /api/menu-items
router.get(
  "/",
  authMiddleware,
  authorize("SuperAdmin", "MenuManager"),
  menuItemController.getMenuItems
); // supports ?page=1&limit=10
// PUT /api/menu-items/:id
router.put(
  "/menu-items/:id",
  authMiddleware,
  authorize("SuperAdmin", "KitchenStaff"),
  validate(updateMenuItemSchema),
  menuItemController.updateMenuItem
);
// DELETE /api/menu-items/:id
router.delete(
  "/menu-items/:id",
  authMiddleware,
  authorize("SuperAdmin"),
  menuItemController.deleteMenuItem
);

export default router;
