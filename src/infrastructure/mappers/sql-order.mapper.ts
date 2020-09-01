import SQLMapper from './sql-mapper';
import { UniqueEntityID } from '@entities';
import { Address, IAddressProps, LineItem, Order, Charge } from '@entities';
import SqlLineItemMapper from './sql-line-item.mapper';

export default class SqlOrderMapper extends SQLMapper {
  private _lineItemMapper: SqlLineItemMapper;

  constructor(db: any) {
    const dbName = 'store';
    const modelName = 'order';
    super(dbName, modelName, db);
    this._lineItemMapper = new SqlLineItemMapper(db);
  }

  public toDomain(orderRowDTO: any): Order {
    const chargeProps = {
      paymentMethod: orderRowDTO.payment_method,
      status: orderRowDTO.charge_status
    };

    const chargeId = new UniqueEntityID(orderRowDTO.charge_id);
    const addressProps: IAddressProps = orderRowDTO.billing_address;

    let lineItems: Array<LineItem> = [];

    if (orderRowDTO.line_items) {
      lineItems = orderRowDTO.line_items.map((lineItem: any) => {
        return this._lineItemMapper.toDomain(lineItem);
      })
    }

    const OrderProps = {
      billingAddress: Address.build(addressProps).value,
      customerId: new UniqueEntityID(orderRowDTO.customer_id),
      lineItems: lineItems,
      charge: orderRowDTO.charge_id ? Charge.build(chargeProps, chargeId).value : undefined
    };

    const orderId = new UniqueEntityID(orderRowDTO.id);
    const orderResult = Order.build(OrderProps, orderId);

    return orderResult.value;
  }

  public toPersistence(order: Order): any {
    return {
      id: order.id.toValue(),
      customer_id: order.customerId.toValue(),
      charge_id: order.charge ? order.charge.id.toValue() : null,
      payment_method: order.charge ? order.charge.paymentMethod : null,
      charge_status: order.charge ? order.charge.status : null,
      billing_address: order.billingAddress.toValue()
    }
  }

  /**
   * @override
   */
  public async find(criteria: any): Promise<Order>{
    const t = this._getTransaction();

    let options: any = {
      where: criteria,
      includes: [{
        model: 'line_item'
      }],
      transaction: t
    }

    const row = await this._db.findOne(options);
    if(!row) {
      return null;
    }

    return this.toDomain(row);
  };

  /**
   * @override
   */
  protected async findAll(conditions: any): Promise<Array<Order>> {
    const t = this._getTransaction();

    let options: any = {
      where: conditions,
      includes: [{
        model: 'line_item'
      }],
      transaction: t,
      raw: true
    }

    const rows = await this._db.findAll(options);

    return rows.map((row: any) => {
      return this.toDomain(row);
    });
  };

  /**
   * @override
   */
  public async insert(order: Order): Promise<void> {
    await super.insert(order);

    await this._lineItemMapper
      .insertCollection(order.lineItems);
  }

  /**
   * @override
   */
  public async update(order: Order): Promise<void> {
    await super.update(order);

    await this._lineItemMapper
      .deleteByCriteria({
        order_id: order.id
      });

    await this._lineItemMapper
      .insertCollection(order.lineItems);
  }

  /**
   * @override
   */
  public async delete(order: Order): Promise<void> {
    await this._lineItemMapper
      .deleteByCriteria({
        order_id: order.id
      });
    
    await super.delete(order);
  }

  /**
   * @override
   */
  public async deleteCollection(orders: Order[]): Promise<void> {
    const orderIds = orders.map((o) => {
      return o.id.toValue()
    });
    
    await this._lineItemMapper.deleteByCriteria({
      order_id: orderIds
    });

    await super.deleteCollection(orders);
  }
}