'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable(
      'Users',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        departmentId: {
          type: Sequelize.INTEGER
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        notes: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        mealSizePreference: {
          type: Sequelize.ENUM('s', 'm', 'l'),
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false
        },
        type: {
          type: Sequelize.ENUM('admin','worker'),
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
