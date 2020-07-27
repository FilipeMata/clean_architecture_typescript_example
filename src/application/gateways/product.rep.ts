import { Product } from '@entities';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';
import Repository from '@shared/repository';

export interface ProductRepository extends Repository<Product> {
  getProductById(productId: UniqueEntityID): Promise<Product>;
}