import CustomerDBModel from '@adapters/common/types/customer-db-model';
import { Sequelize, Model, DataTypes } from 'sequelize';

export class CustomerModel extends Model implements CustomerDBModel {
  public id: string;
  public document: string;
  public name: string;
  public cellphone: number;
  public email: string;
  public birthdate: Date;
  public address: JSON;
}

export default (sequelize: Sequelize) => {
  return CustomerModel.init({
    id: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.INTEGER.UNSIGNED,
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