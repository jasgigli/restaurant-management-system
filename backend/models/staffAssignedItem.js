import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Employee from './employee.js';

const StaffAssignedItem = sequelize.define('StaffAssignedItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Employee, key: 'id' },
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignedDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'staffAssignedItems',
  timestamps: true,
});

export default StaffAssignedItem;
