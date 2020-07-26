import { ProductRepository } from '@aplication/gateways';
import { Product } from '@entities';
import { SequelizeBaseRepository, SequelizeRepositoryProps } from './sequelize-base.rep';
import {sequelizeProductMapper } from '../mappers/sequelize-product.mapper';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';

export default class SequelizeProductRepository extends SequelizeBaseRepository<Product> implements ProductRepository {

  constructor() {
    const props: SequelizeRepositoryProps<Product> = {
      dbName: 'store',
      modelName: 'product',
      mapper: sequelizeProductMapper
    };

    super(props);
  }

  async getProductById(productId: UniqueEntityID): Promise<Product> {
    return this._getBy({
      id: productId.toValue()
    })
  }
}
