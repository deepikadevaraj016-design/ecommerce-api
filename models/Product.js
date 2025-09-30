const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Brand = require('./Brand');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  sku: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
},
  description: { 
    type: DataTypes.TEXT 
},
  price: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
},
  status: { 
    type: DataTypes.ENUM('ACTIVE','INACTIVE'), 
    defaultValue:'ACTIVE' 
},
});

Product.belongsTo(Brand, { foreignKey: 'brandId' });
Product.belongsToMany(Category, { through: 'ProductCategory' });
Category.belongsToMany(Product, { through: 'ProductCategory' });

module.exports = Product;
