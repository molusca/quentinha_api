'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {

		// Add seed commands here.

		// Example:
		await queryInterface.bulkInsert('Departments', [
			{
        name: 'Financeiro',
        created_at: new Date(),
        updated_at: new Date(),
			},
			{
        name: 'Recursos Humanos',
        created_at: new Date(),
        updated_at: new Date(),
			},
			{
        name: 'Vendas',
        created_at: new Date(),
        updated_at: new Date(),
			},
			{
        name: 'Marketing',
        created_at: new Date(),
        updated_at: new Date(),
			},
			{
        name: 'Operacional',
        created_at: new Date(),
        updated_at: new Date(),
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