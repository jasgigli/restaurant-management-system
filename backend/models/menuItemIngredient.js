import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import MenuItem from './menuItem.js';
import StoreItem from './storeItem.js';

const MenuItemIngredient = sequelize.define('MenuItemIngredient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: MenuItem, key: 'id' },
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
}, {
  tableName: 'menuItemIngredients',
  timestamps: true,
});

export default MenuItemIngredient;
