const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Expense = require('./expense.model');

const ExpenseTransaction = sequelize.define('expense_transaction', {
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

ExpenseTransaction.belongsTo(Expense, { foreignKey: 'expense_id', onDelete: 'CASCADE' });
Expense.hasMany(ExpenseTransaction, { foreignKey: 'expense_id', onDelete: 'CASCADE' });

module.exports = ExpenseTransaction;
