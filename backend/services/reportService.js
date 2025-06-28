import sequelize from "../config/database.js";
import {
  MenuItem,
  Sale,
  SaleCostLog,
  SaleDetail,
  StoreItem,
} from "../models/index.js";

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

  async getSalesReport({ startDate, endDate }) {
    const sales = await Sale.findAll({
      where: {
        sale_date: {
          [sequelize.Sequelize.Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: SaleDetail,
          include: [{ model: MenuItem }],
        },
      ],
      order: [["sale_date", "DESC"]],
    });

    const totalSales = sales.reduce((sum, sale) => sum + sale.total_amount, 0);
    const totalOrders = sales.length;

    return {
      sales,
      totalSales,
      totalOrders,
      period: { startDate, endDate },
    };
  },

  async getInventoryReport() {
    const storeItems = await StoreItem.findAll({
      order: [["quantity", "ASC"]],
    });

    const lowStockItems = storeItems.filter(
      (item) => item.quantity <= item.reorder_level
    );
    const outOfStockItems = storeItems.filter((item) => item.quantity === 0);

    return {
      storeItems,
      lowStockItems,
      outOfStockItems,
      totalItems: storeItems.length,
      lowStockCount: lowStockItems.length,
      outOfStockCount: outOfStockItems.length,
    };
  },

  async getAnalyticsReport({ startDate, endDate }) {
    // Sales analytics
    const sales = await Sale.findAll({
      where: {
        sale_date: {
          [sequelize.Sequelize.Op.between]: [startDate, endDate],
        },
      },
    });

    const totalSales = sales.reduce((sum, sale) => sum + sale.total_amount, 0);
    const averageOrderValue = totalSales / sales.length || 0;

    // Top selling items
    const saleDetails = await SaleDetail.findAll({
      include: [
        {
          model: Sale,
          where: {
            sale_date: {
              [sequelize.Sequelize.Op.between]: [startDate, endDate],
            },
          },
        },
        { model: MenuItem },
      ],
    });

    const itemSales = {};
    saleDetails.forEach((detail) => {
      const itemName = detail.MenuItem.name;
      if (!itemSales[itemName]) {
        itemSales[itemName] = { quantity: 0, revenue: 0 };
      }
      itemSales[itemName].quantity += detail.quantity;
      itemSales[itemName].revenue += detail.quantity * detail.unit_price;
    });

    const topSellingItems = Object.entries(itemSales)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    return {
      totalSales,
      totalOrders: sales.length,
      averageOrderValue,
      topSellingItems,
      period: { startDate, endDate },
    };
  },
};

export default reportService;
