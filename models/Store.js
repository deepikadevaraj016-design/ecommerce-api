const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Product = require('./Product');

const Store = sequelize.define('Store', {
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  code: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
},
  contact: { 
    type: DataTypes.STRING 
},
  latitude: { 
    type: DataTypes.FLOAT 
},
  longitude: { 
    type: DataTypes.FLOAT 
},
});

Store.belongsToMany(Product, { through: 'ProductStore' });
Product.belongsToMany(Store, { through: 'ProductStore' });

module.exports = Store;
