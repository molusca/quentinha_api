'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable(
      'MenuItems',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        restaurantId: {
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
    return queryInterface.dropTable('MenuItems');
  }
};
