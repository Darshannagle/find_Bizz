const Sequelize = require('sequelize')
const sequelize = new Sequelize('sample','root','',{
    dialect:'mysql',
    host:'localhost'
})
module.exports = sequelize