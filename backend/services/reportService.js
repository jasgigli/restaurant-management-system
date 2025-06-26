const { Sale, SaleCostLog, sequelize } = require("../models");

const reportService = {
  async getNetProfit({ startDate, endDate }) {
    // Sum sales
    const salesTotal = await Sale.sum("total_amount", {
      where: {
        sale_date: {
          [sequelize.Sequelize.Op.between]: [startDate, endDate],
        },
      },
    });
    // Sum COGS
    const cogsTotal = await SaleCostLog.sum("cost_at_time_of_sale", {
      where: {}, // Optionally filter by date if SaleCostLog has timestamps
    });
    return {
      salesTotal: salesTotal || 0,
      cogsTotal: cogsTotal || 0,
      netProfit: (salesTotal || 0) - (cogsTotal || 0),
    };
  },
};

module.exports = reportService;
