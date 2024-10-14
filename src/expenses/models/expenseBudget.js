const { DataTypes } = require('sequelize');

const Category = require('../../category/models/category');
const database = require('../../config/database');


const expenseBudget = database.define('expenseBudget', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  value: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Category',
    },
  },
  budgetBy: {
    type: DataTypes.ENUM('day', 'week', 'month', 'year'),
    allowNull: false,
    defaultValue: 'month'
  }}, {
    tableName: 'expenseBudget',
    timestamps: true
  }
);

expenseBudget.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });


module.exports = expenseBudget;
