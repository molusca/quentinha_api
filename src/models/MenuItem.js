'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class MenuItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};

  MenuItem.init({
    description: DataTypes.STRING,
    name: DataTypes.STRING,
    restaurant_id: DataTypes.NUMBER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  },{
    sequelize,
    modelName: 'MenuItem',
    tableName: 'MenuItems',
    underscored: true,
    paranoid: true
  });

  return MenuItem;
}