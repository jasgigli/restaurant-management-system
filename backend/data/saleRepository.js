import Sale from "../models/sale.js";
import { AppError } from "../utils/appError.js";

class SaleRepository {
  async createSale(saleData, options = {}) {
    try {
      const sale = await Sale.create(saleData, options);
      return sale.get({ plain: true });
    } catch (err) {
      throw AppError.db(err, "Failed to create sale");
    }
  }
  async findSaleById(id, options = {}) {
    try {
      const sale = await Sale.findByPk(id, options);
      return sale ? sale.get({ plain: true }) : null;
    } catch (err) {
      throw AppError.db(err, "Failed to fetch sale");
    }
  }
}

export default new SaleRepository();
