import { UniqueEntityID, Product, LineItem, Customer, Order } from '@entities';
import { OrderData } from '@useCases/common/dtos';
import { GetOrderDataGateway } from './get-order-data.ports';
import { ApplicationError } from '@useCases/common/errors';

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

  private async _mapLineItem(lineItems: LineItem[]) {
    const itemsDTO = [];
    for (const lineItem of lineItems) {

      const product = await this._gateway
        .findProductById(lineItem.productId);
      
      const item = {
        product: this._mapProduct(product),
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

  public async execute(orderRef: string | Order): Promise<OrderData> {
    let order: Order;

    if (orderRef instanceof Order) {
      order = orderRef;
    }

    if (!order && typeof orderRef === 'string') {
      order = await this._gateway
        .findOrderById(new UniqueEntityID(orderRef));
    }

    if (!order) {
      throw new ApplicationError('order_not_found');
    }

    const buyer  = await this._gateway
      .findCustomerById(order.buyerId);

    return {
      id: order.id.toString(),
      billingAddress: order.billingAddress.toValue(),
      lineItems: await this._mapLineItem(order.lineItems),
      buyer: this._mapCustomer(buyer)
    };
  }
}


