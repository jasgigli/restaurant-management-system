const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class SalaryAdvance extends Model {}

SalaryAdvance.init(
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
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_given: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SalaryAdvance",
    timestamps: true,
  }
);

module.exports = SalaryAdvance;
