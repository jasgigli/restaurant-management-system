const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class StoreItem extends Model {}

StoreItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    cost_per_unit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    low_stock_threshold: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "StoreItem",
    timestamps: true,
    indexes: [{ fields: ["quantity"] }],
  }
);

module.exports = StoreItem;
