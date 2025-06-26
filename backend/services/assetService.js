const { RestaurantAsset } = require("../models");
const AppError = require("../utils/AppError");

const assetService = {
  async getAssets({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const { rows, count } = await RestaurantAsset.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
    return { assets: rows, total: count };
  },
  async createAsset(data) {
    return RestaurantAsset.create(data);
  },
  async updateAsset(id, data) {
    const [updated] = await RestaurantAsset.update(data, { where: { id } });
    if (!updated) throw new AppError("Asset not found", 404);
    return RestaurantAsset.findByPk(id);
  },
  async deleteAsset(id) {
    const deleted = await RestaurantAsset.destroy({ where: { id } });
    if (!deleted) throw new AppError("Asset not found", 404);
    return true;
  },
};

module.exports = assetService;
