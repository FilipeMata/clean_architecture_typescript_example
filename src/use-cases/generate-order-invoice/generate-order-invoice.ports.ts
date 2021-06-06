import { OrderData, InvoiceData } from "@useCases/common/dtos";
import { Order, UniqueEntityID } from '@entities';
import { GenerateOrderInvoiceResponseDTO } from './generate-order-invoice-response.dtos';

export interface GenerateOrderInvoiceGateway {
  startTransaction(): void,
  endTransaction(): Promise<void>,
  findOrderById(orderId: UniqueEntityID): Promise<Order>;
  generateInvoice(orderData: OrderData): Promise<InvoiceData>;
  save(order: Order): Promise<void>;
}

export interface GenerateOrderInvoicePresenter {
  show(result: GenerateOrderInvoiceResponseDTO): void | Promise<void>;
}