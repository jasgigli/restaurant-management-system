import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Employee from './employee.js';

const SalaryAdvance = sequelize.define('SalaryAdvance', {
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
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'salaryAdvances',
  timestamps: true,
});

export default SalaryAdvance;
