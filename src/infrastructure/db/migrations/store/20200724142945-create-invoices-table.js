module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoices', {
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
      charge_id: {
        type: Sequelize.DataTypes.INTEGER,
        unique: true,
        allowNull: true
      },
      payment_method: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      charge_status: {
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
      return queryInterface.addIndex('invoices', ['id']);
    })
    .then(() => {
      return queryInterface.addIndex('invoices', ['customer_id']);
    })
    .then(() => {
      return queryInterface.addIndex('invoices', ['charge_id']);
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('invoices');
  }
};