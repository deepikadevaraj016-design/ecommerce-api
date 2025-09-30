const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const Brand = sequelize.define('Brand', {
  name: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  }

});

module.exports = Brand;
