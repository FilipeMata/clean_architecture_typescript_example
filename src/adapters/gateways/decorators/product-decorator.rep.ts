import { Product, UniqueEntityID } from '@entities';
import GatewayDecorator from './gateway-decorator';

export default class ProductDecorator extends GatewayDecorator {
  public async findProductById(productId: UniqueEntityID): Promise<Product> {
    const product = await this.abstractFind('Product', productId);
    return product as Product;
  }
}