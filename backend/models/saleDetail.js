import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Sale from './sale.js';
import MenuItem from './menuItem.js';

const SaleDetail = sequelize.define('SaleDetail', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  saleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Sale, key: 'id' },
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: MenuItem, key: 'id' },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'saleDetails',
  timestamps: true,
});

export default SaleDetail;
