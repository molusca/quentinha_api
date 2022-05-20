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
        department_id: {
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
        size_preference: {
          type: Sequelize.ENUM('p', 'm', 'g'),
          allowNull: false
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false
        },
        type: {
          type: Sequelize.ENUM('admin','worker'),
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
