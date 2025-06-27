import User from './user.js';
import Sale from './sale.js';
import SaleDetail from './saleDetail.js';
import StoreItem from './storeItem.js';
import MenuItem from './menuItem.js';
import Attendance from './attendance.js';
import SalaryAdvance from './salaryAdvance.js';
import Employee from './employee.js';
import StaffAssignedItem from './staffAssignedItem.js';
import RestaurantAsset from './restaurantAsset.js';
import MenuItemIngredient from './menuItemIngredient.js';
import SaleCostLog from './saleCostLog.js';

// Associations
Employee.hasMany(Attendance, { foreignKey: 'employeeId' });
Attendance.belongsTo(Employee, { foreignKey: 'employeeId' });

Employee.hasMany(SalaryAdvance, { foreignKey: 'employeeId' });
SalaryAdvance.belongsTo(Employee, { foreignKey: 'employeeId' });

Employee.hasMany(StaffAssignedItem, { foreignKey: 'employeeId' });
StaffAssignedItem.belongsTo(Employee, { foreignKey: 'employeeId' });

Sale.hasMany(SaleDetail, { foreignKey: 'saleId' });
SaleDetail.belongsTo(Sale, { foreignKey: 'saleId' });

MenuItem.hasMany(SaleDetail, { foreignKey: 'menuItemId' });
SaleDetail.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

MenuItem.belongsToMany(StoreItem, { through: MenuItemIngredient, foreignKey: 'menuItemId' });
StoreItem.belongsToMany(MenuItem, { through: MenuItemIngredient, foreignKey: 'storeItemId' });

SaleDetail.hasMany(SaleCostLog, { foreignKey: 'saleDetailId' });
SaleCostLog.belongsTo(SaleDetail, { foreignKey: 'saleDetailId' });

StoreItem.hasMany(SaleCostLog, { foreignKey: 'storeItemId' });
SaleCostLog.belongsTo(StoreItem, { foreignKey: 'storeItemId' });

export {
  User,
  Sale,
  SaleDetail,
  StoreItem,
  MenuItem,
  Attendance,
  SalaryAdvance,
  Employee,
  StaffAssignedItem,
  RestaurantAsset,
  MenuItemIngredient,
  SaleCostLog,
};
