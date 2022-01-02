module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customers', {
      id: {
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      document: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      cellphone: {
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      birthdate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false
      },
      address: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    })
    .then(() => {
      return queryInterface.addIndex('customers', ['id']);
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('customers');
  }
};