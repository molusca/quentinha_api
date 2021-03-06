'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};

  Order.init({
    amountG: DataTypes.NUMBER,
    amountM: DataTypes.NUMBER,
    amountP: DataTypes.NUMBER,
    creatorUserId: DataTypes.NUMBER,
    restaurantId: DataTypes.NUMBER,
    totalValue: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  },{
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    paranoid: true
  });

  return Order;
}