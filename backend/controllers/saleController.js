const saleService = require("../services/saleService");
const AppError = require("../utils/AppError");

exports.createSale = async (req, res, next) => {
  try {
    const sale = await saleService.createSale(req.body);
    res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

exports.getSalesReport = async (req, res, next) => {
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
};
