import { Order, UniqueEntityID } from '@entities';
import GatewayDecorator from './gateway-decorator';

export default class OrderDecorator extends GatewayDecorator {
  public async findOrderById(orderId: UniqueEntityID): Promise<Order> {
    const order = await this.abstractFind('Order', orderId);
    return order as Order;
  }
}