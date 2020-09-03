import { UniqueEntityID, Order } from '@entities';

export interface GetOrderDataGateway {
  findOrderById(orderId: UniqueEntityID): Promise<Order>;
};