import SQLMapper from './sql-mapper';
import { LineItem, UniqueEntityID } from '@entities';

export default class SqlLineItemMapper extends SQLMapper {
  constructor(db: any) {
    const dbName = 'store';
    const modelName = 'line_item';
    super(db[dbName][modelName]);
  }

  public toDomain(lineItemRowDTO: any): LineItem {
    const lineItemProps = {
      productId: new UniqueEntityID(lineItemRowDTO.product_id),
      orderId: new UniqueEntityID(lineItemRowDTO.order_id),
      quantity: lineItemRowDTO.quantity
    };

    const uniqueId = new UniqueEntityID(lineItemRowDTO.id);
    return LineItem.build(lineItemProps, uniqueId).value;
  }

  public toPersistence(lineItem: LineItem): any {
    return {
      id: lineItem.id.toValue(),
      order_id: lineItem.orderId.toValue(),
      product_id: lineItem.productId.toValue(),
      quantity: lineItem.quantity
    }
  }
}