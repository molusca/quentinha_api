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
      User.belongsTo(models.Department, { foreignKey: 'department_id', onDelete: 'CASCADE' }),
      User.hasMany(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' })
		}
	};
  
  UserDepartment.init({
    user_id: DataTypes.NUMBER,
    department_id: DataTypes.NUMBER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },{
    sequelize,
    modelName: 'UserDepartment',
    tableName: 'UserDepartments',
    underscored: true,
    paranoid: true
  });

  return UserDepartment;
}