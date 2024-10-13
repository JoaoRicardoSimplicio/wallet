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
  }}, {
    tableName: 'expenseBudget',
    timestamps: true
  }
);

expenseBudget.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });


const Expense = database.define('Expense', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: {
        args: [1, 255],
        msg: 'Description must have less than 255 characters'
      }
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
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
  }}, {
    tableName: 'Expense',
    timestamps: true
  }
);

Expense.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });


module.exports = { expenseBudget, Expense };
