import { UniqueEntityID, Product, LineItem, Customer, Order } from '@entities';
import { OrderData } from '@useCases/common/dtos';
import { Result } from '@shared/Result';
import { GetOrderDataGateway } from './get-order-data.ports';

interface GetOrderDataInteractorParams {
  getOrderDataGateway: GetOrderDataGateway
}
export default class GetOrderDataInteractor {
  private _gateway: GetOrderDataGateway;

  constructor(params: GetOrderDataInteractorParams) {
    this._gateway = params.getOrderDataGateway;
  }

  private _mapProduct(product: Product) {
    return {
      name: product.name,
      description: product.description,
      price: product.price
    };
  }

  private _mapLineItem(lineItems: LineItem[]) {
    const itemsDTO = [];
    for (const lineItem of lineItems) {
      const item = {
        product: this._mapProduct(lineItem.product),
        quantity: lineItem.quantity
      };

      itemsDTO.push(item);
    }

    return itemsDTO;
  }

  private _mapCustomer(customer: Customer) {
    return {
      name: customer.name,
      document: customer.document,
      email: customer.email,
      cellphone: customer.cellphone,
      address: customer.address.toValue(),
      birthdate: customer.birthdate.toString()
    }
  }

  public async execute(orderRef: string | Order): Promise<Result<OrderData>> {
    let order: Order;

    if (orderRef instanceof Order) {
      order = orderRef;
    }

    if (!order && typeof orderRef === 'string') {
      try {
        order = await this._gateway
          .findOrderById(new UniqueEntityID(orderRef));
      } catch (err) {
        return Result.fail<OrderData>([
          'unexpected_failure'
        ]);
      }
    }

    if (!order) {
      return Result.fail<OrderData>([
        'order_not_found'
      ]);
    }

    const response: OrderData = {
      id: order.id.toString(),
      billingAddress: order.billingAddress.toValue(),
      lineItems: this._mapLineItem(order.lineItems),
      buyer: this._mapCustomer(order.buyer)
    };

    return Result.success<OrderData>(response);
  }
}


