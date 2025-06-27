import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import SaleDetail from './saleDetail.js';
import StoreItem from './storeItem.js';

const SaleCostLog = sequelize.define('SaleCostLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  saleDetailId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: SaleDetail, key: 'id' },
  },
  storeItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: StoreItem, key: 'id' },
  },
  quantityUsed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  costAtTimeOfSale: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'saleCostLogs',
  timestamps: true,
});

export default SaleCostLog;
