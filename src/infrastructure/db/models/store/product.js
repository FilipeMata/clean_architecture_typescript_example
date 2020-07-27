'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    }
  })
};