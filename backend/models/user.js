const Sequelize=require("sequelize")
const sequelize= require("../database/database")

const User= sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNll:false,
        primaryKey:true

    },
    name:Sequelize.STRING,
    email:Sequelize.STRING
})

module.exports= User;