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
      OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', onDelete: 'CASCADE' }),
      OrderItem.hasMany(models.MenuItem, { foreignKey: 'menu_item_id', onDelete: 'CASCADE' })
      OrderItem.hasMany(models.User, { foreignKey: 'worker_id', onDelete: 'CASCADE' })
		}
	};

  OrderItem.init({
    menu_item_id: DataTypes.NUMBER,
    notes: DataTypes.STRING,
    order_id: DataTypes.NUMBER,
    size: DataTypes.ENUM('P', 'M', 'G'),
    worker_id: DataTypes.NUMBER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },{
    sequelize,
    modelName: 'OrderItem',
    tableName: 'OrderItems',
    underscored: true,
    paranoid: true
  });

  return OrderItem;
}