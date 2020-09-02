import { Product, UniqueEntityID } from '@entities';
import { Repository } from './base-repository';

export default function FindableProduct<TBase extends Repository>(BaseRepository: TBase) {
  return class FindableOrder extends BaseRepository {
    public async findProductById(productId: UniqueEntityID): Promise<Product> {
      const product = await this.abstractFind('Product', productId);
      return product as Product;
    }
  }
}