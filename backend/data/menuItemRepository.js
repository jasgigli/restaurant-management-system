import MenuItem from "../models/menuItem.js";
import { AppError } from "../utils/appError.js";

class MenuItemRepository {
  async findAndCountAll({ page = 1, limit = 10 }) {
    try {
      const offset = (page - 1) * limit;
      const { rows, count } = await MenuItem.findAndCountAll({
        offset,
        limit,
        order: [["createdAt", "DESC"]],
      });
      return { menuItems: rows.map(m => m.get({ plain: true })), total: count };
    } catch (err) {
      throw AppError.db(err, "Failed to fetch menu items");
    }
  }
  async create(data) {
    try {
      const menuItem = await MenuItem.create(data);
      return menuItem.get({ plain: true });
    } catch (err) {
      throw AppError.db(err, "Failed to create menu item");
    }
  }
  async update(id, data) {
    try {
      const [updated] = await MenuItem.update(data, { where: { id } });
      if (!updated) throw AppError.db(null, "Menu item not found");
      const menuItem = await MenuItem.findByPk(id);
      return menuItem.get({ plain: true });
    } catch (err) {
      throw AppError.db(err, "Failed to update menu item");
    }
  }
  async delete(id) {
    try {
      const deleted = await MenuItem.destroy({ where: { id } });
      if (!deleted) throw AppError.db(null, "Menu item not found");
      return true;
    } catch (err) {
      throw AppError.db(err, "Failed to delete menu item");
    }
  }
}

export default new MenuItemRepository();
