const { DataTypes } = require('sequelize');
const database = require('../../config/database');


const Category = database.define('Category', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      len: {
        args: [1, 60],
        msg: 'Name must have less than 60 characters'
      }
    }
  },
  }, {
    tableName: 'Category',
    timestamps: true
  }
);


module.exports = Category;
