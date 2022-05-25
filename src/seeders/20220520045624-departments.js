'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {

		// Add seed commands here.

		// Example:
		await queryInterface.bulkInsert('Departments', [
			{
        name: 'Financeiro',
        createdAt: new Date(),
        updatedAt: new Date(),
			},
			{
        name: 'Recursos Humanos',
        createdAt: new Date(),
        updatedAt: new Date(),
			},
			{
        name: 'Vendas',
        createdAt: new Date(),
        updatedAt: new Date(),
			},
			{
        name: 'Marketing',
        createdAt: new Date(),
        updatedAt: new Date(),
			},
			{
        name: 'Operacional',
        createdAt: new Date(),
        updatedAt: new Date(),
			},
			{
        name: 'Administração',
        createdAt: new Date(),
        updatedAt: new Date(),
			},
		], {});

	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 */
		 await queryInterface.bulkDelete('Departments', null, {});
	}
};