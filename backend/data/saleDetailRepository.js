import SaleDetail from "../models/sale_detail.js";
import { AppError } from "../utils/appError.js";

class SaleDetailRepository {
  async createSaleDetail(detailData, options = {}) {
    try {
      const detail = await SaleDetail.create(detailData, options);
      return detail.get({ plain: true });
    } catch (err) {
      throw AppError.db(err, "Failed to create sale detail");
    }
  }
  async bulkCreateSaleDetails(details, options = {}) {
    try {
      const created = await SaleDetail.bulkCreate(details, { ...options, returning: true });
      return created.map(d => d.get({ plain: true }));
    } catch (err) {
      throw AppError.db(err, "Failed to create sale details");
    }
  }
}

export default new SaleDetailRepository();
