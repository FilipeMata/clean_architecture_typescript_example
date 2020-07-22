import { Product } from '@entities/Product';

export interface IProductRepository extends Repository<Product> {
  getProductById(productId: string): Promise<Product>;
  getProductByName(productName: string): Promise<Product>;
}