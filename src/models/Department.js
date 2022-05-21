'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
  
  Department.init({
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  },{
    sequelize,
    modelName: 'Department',
    tableName: 'Departments',
    paranoid: true
  });

  return Department;
}