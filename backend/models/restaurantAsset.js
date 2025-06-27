import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RestaurantAsset = sequelize.define('RestaurantAsset', {
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
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  purchaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'restaurantAssets',
  timestamps: true,
});

export default RestaurantAsset;
