import { OrderData } from '@useCases/common/get-order-data'
import { Invoice, Order, UniqueEntityID } from '@entities';

export default interface GenerateOrderInvoiceGateway {
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  findOrderById(orderId: UniqueEntityID): Promise<Order>;
  generateInvoice(orderData: OrderData): Promise<Invoice>;
  saveOrder(order: Order): Promise<void>;
}