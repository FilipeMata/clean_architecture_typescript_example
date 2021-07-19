import OrderPersistenceData from '@adapters/common/order-persistence-data';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { LineItemModel } from './line-item';

export class OrderModel extends Model implements OrderPersistenceData {
  public id: string;
  public customer_id: number;
  public invoice_number: string;
  public invoice_url: string;
  public billing_address: JSON;
  public line_items?: LineItemModel[];
}

export default (sequelize: Sequelize) => {
  return OrderModel.init({
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.BIGINT.UNSIGNED,
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