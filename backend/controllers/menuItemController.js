const menuItemService = require("../services/menuItemService");
const AppError = require("../utils/AppError");

exports.getMenuItems = async (req, res, next) => {
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
};

exports.createMenuItem = async (req, res, next) => {
  try {
    const menuItem = await menuItemService.createMenuItem(req.body);
    res.status(201).json(menuItem);
  } catch (error) {
    next(error);
  }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    const menuItem = await menuItemService.updateMenuItem(
      req.params.id,
      req.body
    );
    res.json(menuItem);
  } catch (error) {
    next(error);
  }
};

exports.deleteMenuItem = async (req, res, next) => {
  try {
    await menuItemService.deleteMenuItem(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.addIngredients = async (req, res) => {
  try {
    const { id } = req.params;
    const { ingredients } = req.body; // [{ storeItemId, quantity_used }]
    await MenuItemIngredient.destroy({ where: { menuItemId: id } });
    for (const ing of ingredients) {
      await MenuItemIngredient.create({
        menuItemId: id,
        storeItemId: ing.storeItemId,
        quantity_used: ing.quantity_used,
      });
    }
    res.json({ message: "Ingredients updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({
      include: {
        model: StoreItem,
        through: { attributes: ["quantity_used"] },
      },
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
