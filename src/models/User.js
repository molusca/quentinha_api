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
    department_id: DataTypes.NUMBER,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    notes: DataTypes.STRING,
    password: DataTypes.STRING,
    size_preference: DataTypes.ENUM('p', 'm', 'g'),
    token: DataTypes.STRING,
    type: DataTypes.ENUM('admin', 'worker'),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  },{
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true,
    paranoid: true
  });

  return User;
}