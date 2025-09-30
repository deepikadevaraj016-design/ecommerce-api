const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Order = require('./Order');
const Product = require('./Product');

const OrderItem = sequelize.define('OrderItem', {
  quantity: { 
    type: DataTypes.INTEGER, 
    defaultValue: 1 
  },
  priceSnapshot: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
  },
});

Order.hasMany(OrderItem, { foreignKey: 'orderId' });  
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' }); 
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = OrderItem;
