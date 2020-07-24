module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    })
    .then(() => {
      return queryInterface.addIndex('products', ['id']);
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('products');
  }
};