import CustomerPersistenceData from '@adapters/common/models/customer-persistence-data';
import { Sequelize, Model, DataTypes } from 'sequelize';

export class CustomerModel extends Model implements CustomerPersistenceData {
  public id: number;
  public document: string;
  public name: string;
  public cellphone: string;
  public email: string;
  public birthdate: Date;
  public address: JSON;
}

export default (sequelize: Sequelize) => {
  return CustomerModel.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    address: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'customers',
    modelName: 'customer',
    timestamps: false
  })
};