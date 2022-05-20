'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};

  Restaurant.init({
    cnpj: DataTypes.STRING,
    name: DataTypes.STRING,
    order_email: DataTypes.STRING,
    oder_phone: DataTypes.STRING,
    price_g: DataTypes.FLOAT,
    price_m: DataTypes.FLOAT,
    price_p: DataTypes.FLOAT,
    responsible_email: DataTypes.STRING,
    responsible_name: DataTypes.STRING,
    responsible_phone: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },{
    sequelize,
    modelName: 'Restaurant',
    tableName: 'Restaurants',
    underscored: true,
    paranoid: true
  });

  return Restaurant;
}