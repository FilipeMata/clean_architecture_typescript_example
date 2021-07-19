import { Order, UniqueEntityID, LineItem } from '@entities';
import { DataMapper } from '../data-mapper';
import OrderPersistenceData, * as OrderMapper from '../order-persistence-data';
import LineItemPersistenceData, * as LineItemMapper from '../line-item-persistence-data';
import { Criteria } from '../criteria';

type GConstructor<T = {}> = new (...args: any[]) => T;

export default function MixOrderRepository<TBase extends GConstructor>(Gateway: TBase) {
  
  return class OrderRepository extends Gateway {

    private _orderDataMaper: DataMapper<OrderPersistenceData>;
    private _lineItemDataMapper: DataMapper<LineItemPersistenceData>

    constructor(...args: any[]) {
      super(...args);
      this._orderDataMaper = args[0].orderDataMaper;
      this._lineItemDataMapper = args[0].lineItemDataMapper;
    }
    
    public async findOrderById(orderId: UniqueEntityID): Promise<Order> {
      const criteria = new Criteria<OrderPersistenceData>({
        id: {
          $equal: orderId.toString()
        }
      });

      const orderPersistenceData = await this._orderDataMaper.find({
        criteria,
        includes: [{
          model: 'line_item'
        }]
      });

      return OrderMapper.toDomain(orderPersistenceData);
    }

    private async saveLineItems(lineItems: LineItem[], orderId: string) {
      const newLineItems: LineItemPersistenceData[] = [];

      for (const lineItem of lineItems) {
        const lineItemPersistenceData = LineItemMapper.toPersistence(lineItem, orderId);

        if (lineItem.isNew) {
          newLineItems.push(lineItemPersistenceData as LineItemPersistenceData);
        }

        else if (lineItem.getDirtyProps()?.length > 0){
          const criteria = new Criteria<LineItemPersistenceData>({
            id: {
              $equal: +lineItem.id.toValue()
            }
          }).and({
            order_id: {
              $equal: orderId
            }
          });

          await this._lineItemDataMapper.update(criteria, lineItemPersistenceData);
        }
      }

      const lineItemDeleteCriteria = new Criteria<LineItemPersistenceData>({
        order_id: {
          $equal: orderId
        }
      }).and({
        id: {
          $notIn: lineItems.map((lineItem) => +lineItem.id.toValue())
        }
      });

      await this._lineItemDataMapper.delete(lineItemDeleteCriteria);

      await this._lineItemDataMapper.bulckInsert(newLineItems);
    }

    public async saveOrder(order: Order) {
      const orderPersistenceData = OrderMapper.toPersistence(order);

      if (order.isNew) {
        this._orderDataMaper.insert(orderPersistenceData as OrderPersistenceData);
      } else if (order.getDirtyProps()?.length > 0){

        const criteria = new Criteria<OrderPersistenceData>({
          id: {
            $equal: order.id.toString()
          }
        });

        await this._orderDataMaper.update(criteria, orderPersistenceData)
      }

      await this.saveLineItems(order.lineItems, order.id.toString())
    }
  }
}