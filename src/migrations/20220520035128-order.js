'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable(
      'Orders',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        amountG: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        amountM: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        amountP: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        creatorUserId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        restaurantId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        totalValue: {
          type: Sequelize.FLOAT,
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
    return queryInterface.dropTable('Orders');
  }
};
