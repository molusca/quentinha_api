'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};

  OrderItem.init({
    menuItemId: DataTypes.NUMBER,
    notes: DataTypes.STRING,
    orderId: DataTypes.NUMBER,
    mealSize: DataTypes.ENUM('s', 'm', 'l'),
    workerId: DataTypes.NUMBER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  },{
    sequelize,
    modelName: 'OrderItem',
    tableName: 'OrderItems',
    paranoid: true
  });

  return OrderItem;
}