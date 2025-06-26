const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Attendance extends Model {}

Attendance.init(
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Present", "Absent", "Leave"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Attendance",
    timestamps: true,
    indexes: [{ fields: ["employeeId", "date"] }],
  }
);

module.exports = Attendance;
