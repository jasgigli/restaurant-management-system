import saleService from "../services/saleService.js";
import { AppError } from "../utils/appError.js";

export async function createSale(req, res, next) {
  try {
    const { sale, saleDetails } = req.body;
    const result = await saleService.createSaleWithDetails({ sale, saleDetails });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getSalesReport(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await saleService.getSales({
      page: Number(page),
      limit: Number(limit),
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
}
