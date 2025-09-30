const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Customer = require('./Customer');

const Order = sequelize.define('Order', {
  total: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
  },
  status: {
    type: DataTypes.ENUM('CREATED','PAYMENT_PENDING','PAID','FAILED','CANCELLED'),
    defaultValue: 'CREATED',
  },
});

Order.belongsTo(Customer, { foreignKey: 'customerId' });

module.exports = Order;
