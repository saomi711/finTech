const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.model');

const BankAccount = sequelize.define('bank_account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bank_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false, 
});

BankAccount.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(BankAccount, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = BankAccount;
