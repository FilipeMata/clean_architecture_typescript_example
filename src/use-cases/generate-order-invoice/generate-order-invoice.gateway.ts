import { OrderData, InvoiceData } from "@useCases/common/dtos";
import { Order } from '@entities';

export interface GenerateOrderInvoiceGateway {
  generateInvoice(orderData: OrderData): Promise<InvoiceData>;
  save(order: Order): Promise<void>;
}