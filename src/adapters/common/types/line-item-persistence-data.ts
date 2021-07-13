import { LineItem } from '@entities';

export default interface LineItemPersistenceData {
  id: number;
  order_id: string;
  product_id: number;
  quantity: number;
}

export function toDomain(lineItem: LineItemPersistenceData): LineItem {
  return LineItem.build({
    id: lineItem.id,
    productId: lineItem.product_id,
    quantity: lineItem.quantity
  }, false);
}

export function toPersistence(lineItem: LineItem, orderId: string): Partial<LineItemPersistenceData> {
  const lineItemPersistenceData: Partial<LineItemPersistenceData> = {};

  if (lineItem.isNew) {
    lineItemPersistenceData.order_id = orderId;
    lineItemPersistenceData.id = +lineItem.id.toValue();
  }

  if (lineItem.isNew || lineItem.getDirtyProps().includes('productId')) {
    lineItemPersistenceData.product_id = +lineItem.productId.toValue();
  }

  if (lineItem.isNew || lineItem.getDirtyProps().includes('quantity')) {
    lineItemPersistenceData.quantity = lineItem.quantity;
  }

  return lineItemPersistenceData;
}