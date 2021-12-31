import ProductPersistenceData from '@adapters/common/models/product-persistence-data';
import { Sequelize, Model, DataTypes } from 'sequelize';

export class ProductModel extends Model implements ProductPersistenceData {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
}

export default (sequelize: Sequelize) => {
  return ProductModel.init({
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
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'product',
    timestamps: false
  })
};