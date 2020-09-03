'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    invoice_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    invoice_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    billing_address: {
      type: DataTypes.JSON,
      allowNull: false
    }
  });
};