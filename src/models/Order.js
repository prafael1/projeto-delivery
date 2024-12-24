import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define(
  'Order',
  {
    status: {
      type: DataTypes.ENUM('pending', 'preparing', 'ready', 'delivered'),
      defaultValue: 'pending',
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customerAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'orders',
    timestamps: true,
  }
);

export default Order;
