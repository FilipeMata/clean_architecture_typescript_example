import { Product } from '@entities/product';

export default interface ProductRepository extends Repository<Product> {
  getProductById(productId: string): Promise<Product>;
  getProductByName(productName: string): Promise<Product>;
}