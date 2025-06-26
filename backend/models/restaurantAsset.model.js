const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class RestaurantAsset extends Model {}

RestaurantAsset.init(
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
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "RestaurantAsset",
    timestamps: true,
  }
);

module.exports = RestaurantAsset;
