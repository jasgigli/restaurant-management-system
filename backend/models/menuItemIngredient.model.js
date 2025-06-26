const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class MenuItemIngredient extends Model {}

MenuItemIngredient.init(
  {
    menuItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "MenuItems", key: "id" },
      primaryKey: true,
    },
    storeItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "StoreItems", key: "id" },
      primaryKey: true,
    },
    quantity_used: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MenuItemIngredient",
    timestamps: true,
  }
);

module.exports = MenuItemIngredient;
