import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const StoreItem = sequelize.define('StoreItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  costPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'storeItems',
  timestamps: true,
});

export default StoreItem;
