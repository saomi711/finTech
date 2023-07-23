const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.model');

const Goal = sequelize.define('goal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_achieved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  monetary_value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false,
});

Goal.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Goal, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Goal;
