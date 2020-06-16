import { Product, UniqueEntityID } from '@entities';
import { SQLBaseRepository, SQLRepositoryProps } from './sql-base.rep';
import sqlProductMapper from '../mappers/sql-product.mapper';
import { Connections } from './sql-models';

export default class SQLProductRepository extends SQLBaseRepository<Product> {

  constructor(db: Connections) {
    const props: SQLRepositoryProps<Product> = {
      dbName: 'store',
      modelName: 'product',
      mapper: sqlProductMapper
    };

    super(props, db);
  }

  async getProductById(productId: UniqueEntityID): Promise<Product> {
    return this._getBy({
      id: productId.toValue()
    })
  }
}
