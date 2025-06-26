const User = require("./user.model");
const StoreItem = require("./storeItem.model");
const MenuItem = require("./menuItem.model");
const MenuItemIngredient = require("./menuItemIngredient.model");
const Sale = require("./sale.model");
const SaleDetail = require("./saleDetail.model");
const Employee = require("./employee.model");
const Attendance = require("./attendance.model");
const SalaryAdvance = require("./salaryAdvance.model");
const RestaurantAsset = require("./restaurantAsset.model");
const StaffAssignedItem = require("./staffAssignedItem.model");
const Expense = require("./expense.model");
const SaleCostLog = require("./saleCostLog.model")(
  sequelize,
  Sequelize.DataTypes
);

// Associations
// Sale & SaleDetail
Sale.hasMany(SaleDetail, { foreignKey: "saleId" });
SaleDetail.belongsTo(Sale, { foreignKey: "saleId" });

// SaleDetail & MenuItem
MenuItem.hasMany(SaleDetail, { foreignKey: "menuItemId" });
SaleDetail.belongsTo(MenuItem, { foreignKey: "menuItemId" });

// Sale & User
User.hasMany(Sale, { foreignKey: "created_by_user_id" });
Sale.belongsTo(User, { foreignKey: "created_by_user_id" });

// MenuItem & MenuItemIngredient
MenuItem.belongsToMany(StoreItem, {
  through: MenuItemIngredient,
  foreignKey: "menuItemId",
  otherKey: "storeItemId",
});
StoreItem.belongsToMany(MenuItem, {
  through: MenuItemIngredient,
  foreignKey: "storeItemId",
  otherKey: "menuItemId",
});

// Employee & Attendance
Employee.hasMany(Attendance, { foreignKey: "employeeId" });
Attendance.belongsTo(Employee, { foreignKey: "employeeId" });

// Employee & SalaryAdvance
Employee.hasMany(SalaryAdvance, { foreignKey: "employeeId" });
SalaryAdvance.belongsTo(Employee, { foreignKey: "employeeId" });

// Employee & StaffAssignedItem
Employee.hasMany(StaffAssignedItem, { foreignKey: "employeeId" });
StaffAssignedItem.belongsTo(Employee, { foreignKey: "employeeId" });

module.exports = {
  User,
  StoreItem,
  MenuItem,
  MenuItemIngredient,
  Sale,
  SaleDetail,
  Employee,
  Attendance,
  SalaryAdvance,
  RestaurantAsset,
  StaffAssignedItem,
  Expense,
  SaleCostLog,
};
