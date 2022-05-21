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
    amount_g: DataTypes.NUMBER,
    amount_m: DataTypes.NUMBER,
    amount_p: DataTypes.NUMBER,
    creator_user_id: DataTypes.NUMBER,
    restaurant_id: DataTypes.NUMBER,
    total_value: DataTypes.FLOAT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  },{
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    underscored: true,
    paranoid: true
  });

  return Order;
}