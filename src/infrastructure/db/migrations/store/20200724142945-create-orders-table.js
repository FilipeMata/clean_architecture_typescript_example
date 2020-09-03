module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.DataTypes.UUID,
        unique: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      customer_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false
      },
      invoice_number: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: true
      },
      invoice_url: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      billing_address: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    })
    .then(() => {
      return queryInterface.addIndex('orders', ['id']);
    })
    .then(() => {
      return queryInterface.addIndex('orders', ['customer_id']);
    })
    .then(() => {
      return queryInterface.addIndex('orders', ['invoice_number']);
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('orders');
  }
};