import { Order, UniqueEntityID } from '@entities';
import { Repository } from './base-repository';

export default function FindableOrder<TBase extends Repository>(Base: TBase) {
  return class FindableOrder extends Base {
    public async findOrderById(orderId: UniqueEntityID): Promise<Order> {
      const order = await this.abstractFind('Order', orderId);
      return order as Order;
    }
  }
}