const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'mysql123456', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;