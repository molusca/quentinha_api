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
    orderEmail: DataTypes.STRING,
    oderPhone: DataTypes.STRING,
    priceG: DataTypes.FLOAT,
    priceM: DataTypes.FLOAT,
    priceP: DataTypes.FLOAT,
    responsibleEmail: DataTypes.STRING,
    responsibleName: DataTypes.STRING,
    responsiblePhone: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  },{
    sequelize,
    modelName: 'Restaurant',
    tableName: 'Restaurants',
    paranoid: true
  });

  return Restaurant;
}