import { Product } from '@entities';

export interface ProductRepository extends Repository<Product> {
  getProductById(productId: string): Promise<Product>;
  getProductByName(productName: string): Promise<Product>;
}