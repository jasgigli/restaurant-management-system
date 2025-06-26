const { StoreItem } = require("../models");
const AppError = require("../utils/AppError");

const storeItemService = {
  async getStoreItems({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const { rows, count } = await StoreItem.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
    return { storeItems: rows, total: count };
  },
  async createStoreItem(data) {
    return StoreItem.create(data);
  },
  async updateStoreItem(id, data) {
    const [updated] = await StoreItem.update(data, { where: { id } });
    if (!updated) throw new AppError("Store item not found", 404);
    return StoreItem.findByPk(id);
  },
  async deleteStoreItem(id) {
    const deleted = await StoreItem.destroy({ where: { id } });
    if (!deleted) throw new AppError("Store item not found", 404);
    return true;
  },
};

module.exports = storeItemService;
