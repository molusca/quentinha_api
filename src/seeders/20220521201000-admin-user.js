'use strict';

const bcrypt = require('bcrypt');
const token_jwt = require('../helpers/token');

async function createToken() {
  let token = await token_jwt.create({
    date: new Date(),
  });

  return token;
}

async function getPassword(password) {
  const crypt_password = await bcrypt.hashSync(password, 10); 
  return crypt_password;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('Users', [
			{
        active: true,
        departmentId: 6,
        email: 'admin@email.com',
        name: 'Lucas Freitas',
        password: await getPassword('admin'),
        token: await createToken(),
        type: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
			},
		], {});

	},

	down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
	}
};