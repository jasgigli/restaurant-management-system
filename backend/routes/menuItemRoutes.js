import express from "express";
import * as menuItemController from "../controllers/menuItemController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import {
  createMenuItemSchema,
  updateMenuItemSchema,
} from "../schemas/menuItem.schema.js";

const router = express.Router();

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

export default router;
