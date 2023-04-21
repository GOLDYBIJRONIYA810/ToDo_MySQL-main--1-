
const { config } = require('dotenv');
const Sequelize = require('sequelize');
require('dotenv').config({})
const db = {};
require('dotenv').config({})

console.log("userss,", process.env.NAME , process.env.DATABASE , process.env.PASSWORD, process.env.HOST)
let sequelize = new Sequelize(process.env.DATABASE , process.env.NAME , process.env.PASSWORD , {
        host: process.env.HOST,
        dialect: 'mysql'
    });
    


db.sequelize =sequelize;
db.Sequelize= Sequelize;

module.exports = db;