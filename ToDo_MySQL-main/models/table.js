const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize

const todos = sequelize.define('TODO'  ,  {
    todo: {
        type : Sequelize.STRING,
        allowNULL : false
    },
    userID : {
        
    },
    isDone : {
        type: Sequelize.BOOLEAN
    }
})

todos.belongsto(users)
module.exports = todos