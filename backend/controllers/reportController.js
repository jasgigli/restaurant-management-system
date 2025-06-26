const {
  Sale,
  SaleDetail,
  MenuItem,
  StoreItem,
  Employee,
  SalaryAdvance,
  Expense,
  RestaurantAsset,
} = require("../models");
const { Op } = require("sequelize");
const reportService = require("../services/reportService");

exports.getNetProfit = async (req, res, next) => {
  try {
    const { start, end } = req.query;
    const startDate = start
      ? new Date(start)
      : new Date(new Date().getFullYear(), 0, 1);
    const endDate = end ? new Date(end) : new Date();
    // Use new service for sales and COGS
    const { salesTotal, cogsTotal } = await reportService.getNetProfit({
      startDate,
      endDate,
    });
    // Salaries
    const employees = await Employee.findAll();
    const salaries = employees.reduce((sum, e) => sum + e.salary, 0);
    // Advances
    const advances = await SalaryAdvance.findAll();
    const totalAdvances = advances.reduce((sum, a) => sum + a.amount, 0);
    // Expenses
    const expenses = await Expense.findAll();
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    // Asset Purchases
    const assets = await RestaurantAsset.findAll();
    const totalAssets = assets.reduce((sum, a) => sum + a.cost, 0);
    // Net Profit
    const netProfit =
      salesTotal -
      (cogsTotal + salaries + totalAdvances + totalExpenses + totalAssets);
    res.json({
      totalSales: salesTotal,
      cogs: cogsTotal,
      salaries,
      totalAdvances,
      totalExpenses,
      totalAssets,
      netProfit,
    });
  } catch (error) {
    next(error);
  }
};
