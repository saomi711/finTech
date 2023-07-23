const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.model');

const Expense = sequelize.define('expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  period: {
    type: DataTypes.STRING,
  },
  start: {
    type: DataTypes.DATE,
  },
  end: {
    type: DataTypes.DATE,
  },
  institution: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false, 
});

Expense.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Expense, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Expense;
