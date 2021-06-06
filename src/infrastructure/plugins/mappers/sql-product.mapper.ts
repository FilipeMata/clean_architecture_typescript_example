import SQLMapper from './sql-mapper';
import { Product, UniqueEntityID } from '@entities';
import { Transaction } from 'sequelize';
import { getModels } from '../../db/models';

export default class SqlProductMapper extends SQLMapper {
  constructor(transaction?: Transaction) {
    const db = getModels();
    super(db.models.product, transaction);;
  }

  public toDomain(productRowDTO: any): Product {
    const productProps = {
      name: productRowDTO.name,
      description: productRowDTO.description,
      price: productRowDTO.price
    }

    const uniqueId = new UniqueEntityID(productRowDTO.id);
    return Product.build(productProps, uniqueId).value;
  }

  public toPersistence(product: Product): any {
    return {
      id: product.id.toValue(),
      name: product.name,
      description: product.description,
      price: product.price
    } 
  }
}