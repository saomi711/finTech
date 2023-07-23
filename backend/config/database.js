const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fintech', 'me', '1122', {
  host: 'localhost',
  port: 6000,
  dialect: 'postgres', 
});

module.exports = sequelize;
