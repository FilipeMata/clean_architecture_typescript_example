import { Product, UniqueEntityID } from '@entities';
import { ProductDataMapper } from '../interfaces/data-mappers';
import { toDomain } from '../models/product-persistence-data';

type GConstructor<T = {}> = new (...args: any[]) => T;

export default function MixProductRepository<TBase extends GConstructor>(Gateway: TBase) {
  
  return class ProductRepository extends Gateway {

    private _productDataMaper: ProductDataMapper;

    constructor(...args: any[]) {
      super(...args);
      this._productDataMaper = args[0].productDataMapper;
    }
    
    public async findProductById(productId: UniqueEntityID): Promise<Product> {
      const productPersistenceData = await this._productDataMaper.findById(+productId.toValue())
      return toDomain(productPersistenceData);
    }
  }
}