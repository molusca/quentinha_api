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
        order_email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        order_phone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price_g: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        price_m: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        price_p: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        responsible_email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        responsible_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        responsible_phone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DATE
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Restaurants');
  }
};
