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
      User.belongsTo(models.UserDepartment, { foreignKey: 'user_id', onDelete: 'CASCADE' }),
      User.hasMany(models.OrderItem, { foreignKey: 'worker_id', onDelete: 'CASCADE' }),
      User.hasMany(models.Order, { foreignKey: 'creator_user_id', onDelete: 'CASCADE' })
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
    updated_at: DataTypes.DATE
  },{
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true,
    paranoid: true
  });

  return User;
}