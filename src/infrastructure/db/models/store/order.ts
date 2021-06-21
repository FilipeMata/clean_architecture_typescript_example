import OrderDBModel from '@adapters/common/types/order-db-model';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { LineItemModel } from './line-item';

export class OrderModel extends Model implements OrderDBModel {
  public id: string;
  public customer_id: string;
  public invoice_number: string;
  public invoice_url: number;
  public billing_address: JSON;
  public line_items?: LineItemModel[];
}

export default (sequelize: Sequelize) => {
  return OrderModel.init({
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
  }, {
    sequelize,
    tableName: 'orders',
    modelName: 'order',
    timestamps: false
  });
};