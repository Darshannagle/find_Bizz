const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");


const Business = sequelize.define('Business', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Business 