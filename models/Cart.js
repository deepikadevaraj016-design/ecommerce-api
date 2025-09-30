const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Customer = require('./Customer');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
  quantity: { 
    type: DataTypes.INTEGER, 
    defaultValue: 1 
},
  priceSnapshot: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
}, 
});

Cart.belongsTo(Customer, { foreignKey: 'customerId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Cart;
