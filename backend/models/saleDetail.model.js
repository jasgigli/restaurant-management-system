const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class SaleDetail extends Model {}

SaleDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Sales", key: "id" },
    },
    menuItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "MenuItems", key: "id" },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SaleDetail",
    timestamps: true,
  }
);

module.exports = SaleDetail;
