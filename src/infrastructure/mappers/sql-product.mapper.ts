import SQLMapper from './sql-mapper';
import { Product, UniqueEntityID } from '@entities';

export default class SqlProductMapper extends SQLMapper {
  constructor(db: any) {
    const dbName = 'store';
    const modelName = 'product';
    super(db[dbName][modelName]);
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