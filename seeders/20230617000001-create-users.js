'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create users
    await queryInterface.bulkInsert('Users', [
      {
        username: 'bill',
        password: 'password1',
        
      },
      {
        username: 'jane',
        password: 'password2',
       
      },
      {
        username: 'bob',
        password: 'password2',
       
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove users
    await queryInterface.bulkDelete('Users', null, {});
  },
};
