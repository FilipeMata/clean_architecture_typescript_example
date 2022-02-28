'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('customers', [{
      id: 1,
      document: '99999999999',
      name: 'John Wick',
      cellphone: 99999999999,
      email: 'jonh.wick@teste.com',
      birthdate: '1970-01-01',
      address: JSON.stringify({
        street: 'Rua Algum lugas',
        neighborhood: 'Somwhere',
        city: 'Ouro Preto',
        number: '50',
        state: 'Minas Gerais',
        country: 'Brasil',
        complement: 'casa',
        zipcode: '35400000'
      })
    }], {});
  }
};
