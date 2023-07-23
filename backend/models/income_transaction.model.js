const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Income = require('./income.model');

const IncomeTransaction = sequelize.define('income_transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false, 
});

IncomeTransaction.belongsTo(Income, { foreignKey: 'income_id', onDelete: 'CASCADE' });
Income.hasMany(IncomeTransaction, { foreignKey: 'income_id', onDelete: 'CASCADE' });

module.exports = IncomeTransaction;
