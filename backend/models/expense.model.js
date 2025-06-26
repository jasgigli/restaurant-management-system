const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Expense extends Model {}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.ENUM(
        "Utilities",
        "Rent",
        "Marketing",
        "Maintenance",
        "Miscellaneous"
      ),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    expense_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Expense",
    timestamps: true,
  }
);

module.exports = Expense;
