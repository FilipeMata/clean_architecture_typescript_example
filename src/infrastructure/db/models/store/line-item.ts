import LineItemPersistenceData from '@adapters/common/line-item-persistence-data';
import { Sequelize, Model, DataTypes } from 'sequelize';

export class LineItemModel extends Model implements LineItemPersistenceData {
  public id: number;
  public order_id: string;
  public product_id: number;
  public quantity: number;
}

export default (sequelize: Sequelize) => {
  return LineItemModel.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    order_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'line_items',
    modelName: 'line_item',
    timestamps: false
  })
};