import storeItemRepository from "../data/storeItemRepository.js";
import { AppError } from "../utils/appError.js";

const storeItemService = {
  async getStoreItems({ page = 1, limit = 10 }) {
    // Implement pagination in repository if needed
    // For now, fetch all
    return storeItemRepository.findAll({ page, limit });
  },
  async createStoreItem(data) {
    return storeItemRepository.create(data);
  },
  async updateStoreItem(id, data) {
    return storeItemRepository.update(id, data);
  },
  async deleteStoreItem(id) {
    return storeItemRepository.delete(id);
  },
};

export default storeItemService;
