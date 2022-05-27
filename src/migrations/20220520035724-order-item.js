'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable(
      'OrderItems',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        menuItemId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        notes: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        mealSize: {
          type: Sequelize.ENUM('s', 'm', 'l'),
          allowNull: false,
        },
        workerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OrderItems');
  }
};
