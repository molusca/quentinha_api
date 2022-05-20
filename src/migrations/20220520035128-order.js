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
        amount_g: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        amount_m: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        amount_p: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        creator_user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        restaurant_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        total_value: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};
