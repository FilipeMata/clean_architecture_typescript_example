import SQLMapper from './sql-mapper';
import { Customer, UniqueEntityID } from '@entities';
import { Address, IAddressProps, LineItem, Order, Charge } from '@entities';
import SqlLineItemMapper from './sql-line-item.mapper';
import SqlCustomerMapper from './sql-customer.mapper';

export default class SqlOrderMapper extends SQLMapper {
  private _lineItemMapper: SqlLineItemMapper;
  private _lineItemModel: any;
  private _customerModel: any;
  private _productModel: any;
  private _customerMapper: SqlCustomerMapper;

  constructor(db: any) {
    const dbName = 'store';
    const modelName = 'order';
    super(dbName, modelName, db);
    this._lineItemModel = db.store.line_item;
    this._customerModel = db.store.customer;
    this._productModel = db.store.product;
    this._lineItemMapper = new SqlLineItemMapper(db);
    this._customerMapper = new SqlCustomerMapper(db);
  }

  public toDomain(orderRowDTO: any): Order {
    const chargeProps = {
      number: orderRowDTO.charge_id,
      paymentMethod: orderRowDTO.payment_method,
      status: orderRowDTO.charge_status
    };

    const addressProps: IAddressProps = orderRowDTO.billing_address;

    let lineItems: Array<LineItem> = [];
    let buyer: Customer;

    if (orderRowDTO.line_items) {
      lineItems = orderRowDTO.line_items.map((lineItem: any) => {
        return this._lineItemMapper.toDomain(lineItem);
      })
    }

    if (orderRowDTO.customer) {
      buyer = this._customerMapper.toDomain(orderRowDTO.customer);
    }

    const orderProps = {
      billingAddress: Address.build(addressProps).value,
      buyer: buyer,
      lineItems: lineItems,
      charge: orderRowDTO.charge_id ? Charge.build(chargeProps).value : undefined
    };

    const orderId = new UniqueEntityID(orderRowDTO.id);
    const orderResult = Order.build(orderProps, orderId);

    return orderResult.value;
  }

  public toPersistence(order: Order): any {
    return {
      id: order.id.toValue(),
      customer_id: order.buyer.id.toValue(),
      charge_id: order.charge ? +order.charge.toValue().number : null,
      payment_method: order.charge ? order.charge.toValue().paymentMethod : null,
      charge_status: order.charge ? order.charge.toValue().status : null,
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
      include: [{
        model: this._lineItemModel,
        include: [{
          model: this._productModel
        }]
      }, {
        model: this._customerModel
      }]
    }

    if (t) {
      options.transactions = t;
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
  public async findAll(conditions: any): Promise<Array<Order>> {
    const t = this._getTransaction();

    let options: any = {
      where: conditions,
      include: [{
        model: this._lineItemModel,
        include: [{
          model: this._productModel
        }]
      }, {
        model: this._customerModel
      }],
      raw: true
    }

    if (t) {
      options.transactions = t;
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
      .insertCollection(order.lineItems, order.id);
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
  
  /**
   * @override
   */
  async insertCollection(orders: Order[]): Promise<void> {
    for (const order of orders) {
      await this.insert(order);
    }
  }
}