'use strict';

const Sequelize = require('sequelize');
const db = {};

let sequelize;
if(config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable] , config);

}
else {
    sequelize = new Sequelize(process.env.DATABASE , process.env.USERNAME , process.env.PASSWORD , {
        host: process.env.HOST,
        dialect: 'mysql'
    });
    
}

db.sequelize =sequelize;
db.Sequelize= Sequelize;

module.exports = db;