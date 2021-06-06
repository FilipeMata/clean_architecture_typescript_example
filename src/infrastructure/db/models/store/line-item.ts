import { Sequelize, Model, DataTypes } from 'sequelize';

interface LineItemModelAttributes {
  id: string;
  order_id: string;
  product_id: number;
  quantity: number;
}

export class LineItemModel extends Model implements LineItemModelAttributes {
  public id: string;
  public order_id: string;
  public product_id: number;
  public quantity: number;
}

export default (sequelize: Sequelize) => {
  return LineItemModel.init({
    id: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    order_id: {
      type: DataTypes.UUID,
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