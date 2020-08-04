import { SQLBaseRepository, SQLRepositoryProps } from './sql-base.rep';
import sqlLineItemMapper from '../mappers/sql-line-item.mapper';
import { LineItem, UniqueEntityID } from '@entities';
import { Connections } from './sql-models';

export default class SQLLineItemRepository extends SQLBaseRepository<LineItem> {

  constructor(db: Connections) {
    const props: SQLRepositoryProps<LineItem> = {
      dbName: 'store',
      modelName: 'line_item',
      mapper: sqlLineItemMapper
    };

    super(props, db);
  }

  async getLineItemById(lineItemId: UniqueEntityID): Promise<LineItem> {
    return this._getBy({
      id: lineItemId.toValue()
    })
  }

  async getLineItemsByOrderId(orderId: UniqueEntityID): Promise<Array<LineItem>> {
    return this._getAllBy({
      order_id: orderId.toValue()
    });
  }
}
