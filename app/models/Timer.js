const { DataTypes, Model } = require("sequelize");
const sequelize = require('../database');

class Timer extends Model {}

Timer.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  delay: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'timer'
});

module.exports = Timer;