import { Order, UniqueEntityID } from "@entities";

export interface DetailOrderGateway {
  findOrderById(orderId: UniqueEntityID): Promise<Order>;
};