'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expenseBudget', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      value: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Category',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      budgetBy: {
        type: Sequelize.ENUM('day', 'week', 'month', 'year'),
        allowNull: false,
        defaultValue: 'month'
      }
    });

    await queryInterface.addConstraint('expenseBudget', {
      fields: ['budgetBy', 'categoryId'],
      type: 'unique',
      name: 'categoryBudgetBy' // This is the name you want for your unique constraint
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('expenseBudget', 'categoryBudgetBy');
    await queryInterface.dropTable('expenseBudget');
  }
};
