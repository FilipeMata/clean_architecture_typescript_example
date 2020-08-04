import { SQLBaseRepository, SQLRepositoryProps } from './sql-base.rep';
import sqlOrderMapper from '../mappers/sql-order.mapper';
import SQLLineItemRepository from './sql-line-item.rep';
import { Order, UniqueEntityID } from '@entities';
import { Connections } from './sql-models';

export default class SQLOrderRepository extends SQLBaseRepository<Order> {
  private _lineItemRepository: SQLLineItemRepository;

  constructor( db: Connections ) {
    const props: SQLRepositoryProps<Order> = {
      dbName: 'store',
      modelName: 'order',
      mapper: sqlOrderMapper
    };

    super(props, db);
    this._lineItemRepository = new SQLLineItemRepository(db);
  }

  /**
   * @override
   */
  async save(order: Order): Promise<void> {
    await this._lineItemRepository.saveCollection(order.lineItems);
    await super.save(order);
  }

  async getOrderById(orderId: UniqueEntityID): Promise<Order> {
    const order = await this._getBy({
      id: orderId.toValue()
    });

    if (!order) {
      return null;
    }

    const lineItems = await this._lineItemRepository
      .getLineItemsByOrderId(order.id);

    order.lineItems = lineItems;

    return order;
  }
}
