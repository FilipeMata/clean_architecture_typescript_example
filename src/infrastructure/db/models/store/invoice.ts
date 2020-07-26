import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define('invoice', {
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
    charge_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: true
    },
    charge_status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    billing_address: {
      type: DataTypes.JSON,
      allowNull: false
    }
  })
};