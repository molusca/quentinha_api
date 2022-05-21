'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {

		// Add seed commands here.

		// Example:
		await queryInterface.bulkInsert('UserDepartments', [
			{
        userId: 1,
        departmentId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
			}
		], {});

	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 */
		 await queryInterface.bulkDelete('UserDepartments', null, {});
	}
};