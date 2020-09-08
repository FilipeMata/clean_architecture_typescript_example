import { OrderData, InvoiceData } from "@useCases/common/dtos";
import { Order, UniqueEntityID } from '@entities';

export interface GenerateOrderInvoiceGateway {
  startTransaction(): void,
  endTransaction(): Promise<void>,
  findOrderById(orderId: UniqueEntityID): Promise<Order>;
  generateInvoice(orderData: OrderData): Promise<InvoiceData>;
  cancelInvoice(invoiceNumber: string): Promise<void>;
  save(order: Order): Promise<void>;
}