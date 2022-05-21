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
        menu_item_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        notes: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        order_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        size: {
          type: Sequelize.ENUM('P', 'M', 'G'),
          allowNull: false,
        },
        worker_id: {
          type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('OrderItems');
  }
};
