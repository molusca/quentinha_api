'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable(
      'UserDepartments',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        departmentId: {
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
    return queryInterface.dropTable('UserDepartments');
  }
};
