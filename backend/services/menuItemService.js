const { MenuItem } = require("../models");
const AppError = require("../utils/AppError");

const menuItemService = {
  async getMenuItems({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const { rows, count } = await MenuItem.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
    return { menuItems: rows, total: count };
  },
  async createMenuItem(data) {
    return MenuItem.create(data);
  },
  async updateMenuItem(id, data) {
    const [updated] = await MenuItem.update(data, { where: { id } });
    if (!updated) throw new AppError("Menu item not found", 404);
    return MenuItem.findByPk(id);
  },
  async deleteMenuItem(id) {
    const deleted = await MenuItem.destroy({ where: { id } });
    if (!deleted) throw new AppError("Menu item not found", 404);
    return true;
  },
};

module.exports = menuItemService;
