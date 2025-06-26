const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class StaffAssignedItem extends Model {}

StaffAssignedItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Employees", key: "id" },
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_issued: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_returned: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "StaffAssignedItem",
    timestamps: true,
  }
);

module.exports = StaffAssignedItem;
