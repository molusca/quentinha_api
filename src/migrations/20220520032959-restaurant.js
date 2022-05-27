'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable(
      'Restaurants',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        cnpj: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        orderEmail: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        orderPhone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        priceL: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        priceM: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        priceS: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        responsibleEmail: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        responsibleName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        responsiblePhone: {
          type: Sequelize.STRING,
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
    return queryInterface.dropTable('Restaurants');
  }
};
