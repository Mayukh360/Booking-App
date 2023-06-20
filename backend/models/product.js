const sequelize = require('../database/database');

const Sequelize =require('sequelize');

const Product= sequelize.define('product',{
    id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull:false,
      primaryKey:true
    },
    name: Sequelize.STRING,
 
    email: {
      type:Sequelize.STRING,
    allowNull:false
    },
    phone:{
        type:Sequelize.DOUBLE,
        allowNull:false
      },
   
  })
  
  module.exports=Product;