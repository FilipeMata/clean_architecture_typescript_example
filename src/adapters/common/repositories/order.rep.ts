import { Order, UniqueEntityID, LineItem } from '@entities';
import { OrderDataMapper, LineItemDataMapper } from '../interfaces/data-mappers';
import OrderPersistenceData, { toDomain as toOrderEntity, toPersistence as toOrderPersistence} from '../models/order-persistence-data';
import LineItemPersistenceData, { toPersistence as toLineItemPersistence} from '../models/line-item-persistence-data';

type GConstructor<T = {}> = new (...args: any[]) => T;

export default function MixOrderRepository<TBase extends GConstructor>(Gateway: TBase) {
  
  return class OrderRepository extends Gateway {

    private _orderDataMaper: OrderDataMapper;
    private _lineItemDataMapper: LineItemDataMapper

    constructor(...args: any[]) {
      super(...args);
      this._orderDataMaper = args[0].orderDataMaper;
      this._lineItemDataMapper = args[0].lineItemDataMapper;
    }
    
    public async findOrderById(orderId: UniqueEntityID): Promise<Order> {
      const orderPersistenceData = await this._orderDataMaper.findByIdAndIncludeLineItems(orderId.toString());
      return toOrderEntity(orderPersistenceData);
    }

    private async saveLineItems(lineItems: LineItem[], orderId: string) {
      const newLineItems: LineItemPersistenceData[] = [];

      for (const lineItem of lineItems) {
        const lineItemPersistenceData = toLineItemPersistence(lineItem, orderId);

        if (lineItem.isNew) {
          newLineItems.push(lineItemPersistenceData as LineItemPersistenceData);
        }

        else if (lineItem.getDirtyProps()?.length > 0){
          await this._lineItemDataMapper.updateByIdAndOrderId(+lineItem.id.toValue(), orderId, lineItemPersistenceData);
        }
      }

      await this._lineItemDataMapper.deleteByOrderIdWhereIdNotInArray(
        orderId, 
        lineItems.map((lineItem) => +lineItem.id.toValue())
      );

      await this._lineItemDataMapper.bulckInsert(newLineItems);
    }

    public async saveOrder(order: Order) {
      const orderPersistenceData = toOrderPersistence(order);

      if (order.isNew) {
        this._orderDataMaper.insert(orderPersistenceData as OrderPersistenceData);
      } else if (order.getDirtyProps()?.length > 0){
        await this._orderDataMaper.updateById(order.id.toString(), orderPersistenceData)
      }

      await this.saveLineItems(order.lineItems, order.id.toString())
    }
  }
}