import assetRepository from "../data/assetRepository.js";
import { AppError } from "../utils/appError.js";
import { StaffAssignedItem } from "../models/index.js";

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
  // Assigned Items
  async createAssignedItem(data) {
    return StaffAssignedItem.create(data);
  },
  async getAssignedItems() {
    return StaffAssignedItem.findAll();
  },
  async updateAssignedItem(id, data) {
    const item = await StaffAssignedItem.findByPk(id);
    if (!item) throw new AppError("Assigned item not found", 404);
    await item.update(data);
    return item;
  },
  async deleteAssignedItem(id) {
    const item = await StaffAssignedItem.findByPk(id);
    if (!item) throw new AppError("Assigned item not found", 404);
    await item.destroy();
    return true;
  },
};

export default assetService;
