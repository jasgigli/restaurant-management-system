import { MenuItem, MenuItemIngredient, StoreItem } from "../models/index.js";
import menuItemService from "../services/menuItemService.js";

export async function getMenuItems(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await menuItemService.getMenuItems({
      page: Number(page),
      limit: Number(limit),
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function createMenuItem(req, res, next) {
  try {
    const menuItem = await menuItemService.createMenuItem(req.body);
    res.status(201).json(menuItem);
  } catch (error) {
    next(error);
  }
}

export async function updateMenuItem(req, res, next) {
  try {
    const menuItem = await menuItemService.updateMenuItem(
      req.params.id,
      req.body
    );
    res.json(menuItem);
  } catch (error) {
    next(error);
  }
}

export async function deleteMenuItem(req, res, next) {
  try {
    await menuItemService.deleteMenuItem(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function addIngredients(req, res, next) {
  try {
    await menuItemService.addIngredients(req.params.id, req.body.ingredients);
    res.json({ message: "Ingredients updated" });
  } catch (error) {
    next(error);
  }
}

export async function getAllMenuItems(req, res, next) {
  try {
    const menuItems = await menuItemService.getAllMenuItems();
    res.json(menuItems);
  } catch (error) {
    next(error);
  }
}
