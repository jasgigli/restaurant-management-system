import RestaurantAsset from '../models/restaurantAsset.js';
import { AppError } from '../utils/appError.js';

class AssetRepository {
  async create(data) {
    try {
      return await RestaurantAsset.create(data);
    } catch (error) {
      throw new AppError('Failed to create asset', 500);
    }
  }
  async findById(id) {
    const asset = await RestaurantAsset.findByPk(id);
    if (!asset) throw new AppError('Asset not found', 404);
    return asset;
  }
  async findAll() {
    return await RestaurantAsset.findAll();
  }
  async update(id, data) {
    const [updated] = await RestaurantAsset.update(data, { where: { id } });
    if (!updated) throw new AppError('Asset not found', 404);
    return RestaurantAsset.findByPk(id);
  }
  async delete(id) {
    const deleted = await RestaurantAsset.destroy({ where: { id } });
    if (!deleted) throw new AppError('Asset not found', 404);
    return true;
  }
}

export default new AssetRepository();
