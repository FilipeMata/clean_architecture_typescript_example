import RepositoryMapper from './old/repository.mapper';
import { UniqueEntityID } from '@entities';
import { Address, IAddressProps, LineItem, Order, Charge } from '@entities';
import sqlLineItemMapper from './sql-line-item.mapper';

const sqlOrderMapper: RepositoryMapper<Order> = {
  toDomain(orderRowDTO: any): Order {
    const chargeProps = {
      paymentMethod: orderRowDTO.payment_method,
      status: orderRowDTO.charge_status
    };

    const chargeId = new UniqueEntityID(orderRowDTO.charge_id);
    const addressProps: IAddressProps = orderRowDTO.billing_address;

    let lineItems: Array<LineItem> = [];

    if (orderRowDTO.line_items) {
      lineItems = orderRowDTO.line_items.map((lineItem: any) => {
        return sqlLineItemMapper.toDomain(lineItem);
      })
    }

    const addressResult = Address.build(addressProps);

    const OrderProps = {
      billingAddress: Address.build(addressProps).value,
      customerId: new UniqueEntityID(orderRowDTO.customer_id),
      lineItems: lineItems,
      charge: orderRowDTO.charge_id ? Charge.build(chargeProps, chargeId).value : undefined
    };

    const orderId = new UniqueEntityID(orderRowDTO.id);
    const orderResult = Order.build(OrderProps, orderId);

    return orderResult.value;
  },

  toPersistence(order: Order): any {
    return {
      id: order.id.toValue(),
      customer_id: order.customerId.toValue(),
      charge_id: order.charge ? order.charge.id.toValue() : null,
      payment_method: order.charge ? order.charge.paymentMethod : null,
      charge_status: order.charge ? order.charge.status : null,
      billing_address: order.billingAddress.toValue()
    }
  }
}

export default sqlOrderMapper;