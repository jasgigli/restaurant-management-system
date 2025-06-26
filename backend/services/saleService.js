const {
  Sale,
  SaleDetail,
  StoreItem,
  MenuItem,
  MenuItemIngredient,
  SaleCostLog,
  sequelize,
} = require("../models");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");

const saleService = {
  async createSale(saleData) {
    const t = await sequelize.transaction();
    try {
      const { items, total_amount } = saleData;
      // Calculate required ingredients
      let ingredientUsage = {};
      for (const item of items) {
        const ingredients = await MenuItemIngredient.findAll({
          where: { menuItemId: item.menuItemId },
          transaction: t,
        });
        for (const ing of ingredients) {
          if (!ingredientUsage[ing.storeItemId])
            ingredientUsage[ing.storeItemId] = 0;
          ingredientUsage[ing.storeItemId] += ing.quantity_used * item.quantity;
        }
      }
      // Check stock
      for (const storeItemId in ingredientUsage) {
        const storeItem = await StoreItem.findByPk(storeItemId, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (!storeItem || storeItem.quantity < ingredientUsage[storeItemId]) {
          throw new AppError(
            `Insufficient stock for item ID ${storeItemId}`,
            400
          );
        }
      }
      // Decrement stock and log COGS
      for (const storeItemId in ingredientUsage) {
        const storeItem = await StoreItem.findByPk(storeItemId, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        const newQty = storeItem.quantity - ingredientUsage[storeItemId];
        if (newQty < 0) {
          throw new AppError(
            `Insufficient stock for item ID ${storeItemId}`,
            400
          );
        }
        await storeItem.update({ quantity: newQty }, { transaction: t });
      }
      // Create sale
      const sale = await Sale.create(
        { sale_date: new Date(), total_amount },
        { transaction: t }
      );
      for (const item of items) {
        const menuItem = await MenuItem.findByPk(item.menuItemId, {
          transaction: t,
        });
        const saleDetail = await SaleDetail.create(
          {
            saleId: sale.id,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            subtotal: menuItem.price * item.quantity,
          },
          { transaction: t }
        );
        // Log COGS for each ingredient used in this saleDetail
        const ingredients = await MenuItemIngredient.findAll({
          where: { menuItemId: item.menuItemId },
          transaction: t,
        });
        for (const ing of ingredients) {
          const storeItem = await StoreItem.findByPk(ing.storeItemId, {
            transaction: t,
          });
          await SaleCostLog.create(
            {
              saleDetailId: saleDetail.id,
              storeItemId: ing.storeItemId,
              quantity_used: ing.quantity_used * item.quantity,
              cost_at_time_of_sale: storeItem.cost_price || 0,
            },
            { transaction: t }
          );
        }
      }
      await t.commit();
      logger.info(`Sale ID ${sale.id} created successfully`);
      return sale;
    } catch (err) {
      await t.rollback();
      logger.error("Sale creation failed", err);
      throw new AppError("Sale creation failed: " + err.message, 400);
    }
  },
  async getSales({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const { rows, count } = await Sale.findAndCountAll({
      offset,
      limit,
      attributes: ["id", "sale_date", "total_amount"], // Select only needed fields
      order: [["sale_date", "DESC"]],
    });
    return { sales: rows, total: count };
  },
};

module.exports = saleService;
