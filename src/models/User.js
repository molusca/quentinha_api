'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
      // define association here
		}
	};

  User.init({
    active: DataTypes.BOOLEAN,
    departmentId: DataTypes.NUMBER,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    notes: DataTypes.STRING,
    password: DataTypes.STRING,
    mealSizePreference: DataTypes.ENUM('s', 'm', 'l'),
    token: DataTypes.STRING,
    type: DataTypes.ENUM('admin', 'worker'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  },{
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    paranoid: true
  });

  return User;
}