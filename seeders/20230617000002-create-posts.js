'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create posts
    await queryInterface.bulkInsert('Posts', [
      {
        title: 'Post 1',
        content: 'Content for post 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Post 2',
        content: 'Content for post 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more post objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove posts
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
