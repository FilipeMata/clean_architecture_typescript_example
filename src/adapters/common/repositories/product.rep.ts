import { Product, UniqueEntityID } from '@entities';
import { Repository } from '../../common/repositories/base-repository';

export default function MixProductRepository<TBase extends Repository>(BaseRepository: TBase) {
  return class ProductRepository extends BaseRepository {
    public async findProductById(productId: UniqueEntityID): Promise<Product> {
      const product = await this.abstractFind('Product', productId);
      return product as Product;
    }
  }
}