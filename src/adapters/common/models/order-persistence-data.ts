import LineItemPersistenceData, * as LineItemMapper from "./line-item-persistence-data";
import { Address, AddressProps, Invoice, Order, UniqueEntityID } from "@entities";

export default interface OrderPersistenceData {
  id: string;
  customer_id: number;
  invoice_number?: string;
  invoice_url?: string;
  billing_address: any;
  line_items?: LineItemPersistenceData[];
}

export function toDomain(order: OrderPersistenceData): Order {
  let invoice: Invoice;

  if (order.invoice_url && order.invoice_number) {
    invoice = {
      number: order.invoice_number,
      url: order.invoice_url
    }
  }
  
  return Order.build({
    id: new UniqueEntityID(order.id),
    billingAddress: Address.build(order.billing_address as AddressProps),
    buyerId: new UniqueEntityID(order.customer_id),
    builtLineItems: order.line_items?.map((lineItem) => LineItemMapper.toDomain(lineItem)),
    invoice
  });
}

export function toPersistence(order: Order): Partial<OrderPersistenceData> {
  const orderPersistenceData: Partial<OrderPersistenceData> = {};
  
  if (order.isNew || order.getDirtyProps().includes('id')) {
    orderPersistenceData.id = '' + order.id.toValue();
  }

  if (order.isNew || order.getDirtyProps().includes('buyerId')) {
    orderPersistenceData.customer_id = +order.buyerId.toValue();
  }

  if (order.isNew || order.getDirtyProps().includes('invoice')) {
    orderPersistenceData.invoice_number = order.invoice.number;
    orderPersistenceData.invoice_url = order.invoice.url;
  }

  if (order.isNew || order.getDirtyProps().includes('billingAddress')) {
    orderPersistenceData.billing_address = order.billingAddress.toValue();
  }

  return orderPersistenceData;
}
