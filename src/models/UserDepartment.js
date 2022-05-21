'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class UserDepartment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
  
  UserDepartment.init({
    user_id: DataTypes.NUMBER,
    department_id: DataTypes.NUMBER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  },{
    sequelize,
    modelName: 'UserDepartment',
    tableName: 'UserDepartments',
    underscored: true,
    paranoid: true
  });

  return UserDepartment;
}