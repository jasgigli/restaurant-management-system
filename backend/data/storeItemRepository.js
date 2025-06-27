import StoreItem from "../models/storeItem.js";
import { AppError } from "../utils/appError.js";

class StoreItemRepository {
  async findById(id, options = {}) {
    try {
      const item = await StoreItem.findByPk(id, options);
      return item ? item.get({ plain: true }) : null;
    } catch (err) {
      throw AppError.db(err, "Failed to fetch store item");
    }
  }

  async updateQuantity(id, quantity, options = {}) {
    try {
      const item = await StoreItem.findByPk(id, options);
      if (!item) throw AppError.db(null, "Store item not found");
      item.quantity = quantity;
      await item.save(options);
      return item.get({ plain: true });
    } catch (err) {
      throw AppError.db(err, "Failed to update item quantity");
    }
  }
}

export default new StoreItemRepository();
