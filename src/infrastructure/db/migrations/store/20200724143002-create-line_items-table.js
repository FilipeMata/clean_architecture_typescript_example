module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('line_items', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      order_id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      product_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    })
    .then(() => {
      return queryInterface.addIndex('line_items', ['id']);
    })
    .then(() => {
      return queryInterface.addIndex('line_items', ['order_id']);
    })
    .then(() => {
      return queryInterface.addIndex('line_items', ['product_id']);
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('line_items');
  }
};