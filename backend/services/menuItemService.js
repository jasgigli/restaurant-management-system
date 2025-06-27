import menuItemRepository from "../data/menuItemRepository.js";
import { AppError } from "../utils/appError.js";
import { MenuItem, MenuItemIngredient, StoreItem } from "../models/index.js";

const menuItemService = {
  async getMenuItems({ page = 1, limit = 10 }) {
    return menuItemRepository.findAndCountAll({ page, limit });
  },
  async createMenuItem(data) {
    return menuItemRepository.create(data);
  },
  async updateMenuItem(id, data) {
    return menuItemRepository.update(id, data);
  },
  async deleteMenuItem(id) {
    return menuItemRepository.delete(id);
  },
  async addIngredients(menuItemId, ingredients) {
    await MenuItemIngredient.destroy({ where: { menuItemId } });
    for (const ing of ingredients) {
      await MenuItemIngredient.create({
        menuItemId,
        storeItemId: ing.storeItemId,
        quantity_used: ing.quantity_used,
      });
    }
    return true;
  },
  async getAllMenuItems() {
    return MenuItem.findAll({
      include: {
        model: StoreItem,
        through: { attributes: ["quantity_used"] },
      },
    });
  },
};

export default menuItemService;
