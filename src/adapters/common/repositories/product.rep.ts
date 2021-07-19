import { Product, UniqueEntityID } from '@entities';
import { DataMapper } from '../data-mapper';
import { Criteria } from '../criteria';
import ProductPersistenceData, { toDomain } from '../product-persistence-data';

type GConstructor<T = {}> = new (...args: any[]) => T;

export default function MixProductRepository<TBase extends GConstructor>(Gateway: TBase) {
  
  return class ProductRepository extends Gateway {

    private _productDataMaper: DataMapper<ProductPersistenceData>;

    constructor(...args: any[]) {
      super(...args);
      this._productDataMaper = args[0].productDataMapper;
    }
    
    public async findProductById(productId: UniqueEntityID): Promise<Product> {
      const criteria = new Criteria<ProductPersistenceData>({
        id: {
          $equal: +productId.toValue()
        }
      });

      const productPersistenceData = await this._productDataMaper.find({ criteria })

      return toDomain(productPersistenceData);
    }
  }
}