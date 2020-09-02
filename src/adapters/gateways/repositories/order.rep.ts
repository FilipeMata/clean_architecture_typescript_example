import { Order, UniqueEntityID } from '@entities';
import { Repository } from './base-repository';

export default function MixOrderRepository<TBase extends Repository>(Base: TBase) {
  return class OrderRepository extends Base {
    public async findOrderById(orderId: UniqueEntityID): Promise<Order> {
      const order = await this.abstractFind('Order', orderId);
      return order as Order;
    }
  }
}