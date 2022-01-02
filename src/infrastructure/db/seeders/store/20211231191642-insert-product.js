'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('products', [{
      name: 'TV',
      description: 'TV 4k 55 pol',
      price: 15000
    }, {
      name: 'PS5',
      description: 'Playstation 5',
      price: 50000
    }], {});
  }
};
