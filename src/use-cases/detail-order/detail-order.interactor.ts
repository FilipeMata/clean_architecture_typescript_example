import { UniqueEntityID, Product, LineItem, Customer } from '@entities';
import { DetailOrder, OutputPort } from '@useCases';

export class DetailOrderInteractor {
  private _gateway: DetailOrder.DetailOrderGateway;
  private _presenter: OutputPort<DetailOrder.DetailOrderResponseDTO>;

  constructor(
    gateway: DetailOrder.DetailOrderGateway,
    presenter: OutputPort<DetailOrder.DetailOrderResponseDTO>
  ) {
    this._gateway = gateway;
    this._presenter = presenter;
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
    }
  }

  public async execute(orderId: string) {
    let response: DetailOrder.DetailOrderResponseDTO = {};

    const order = await this._gateway
      .findOrderById(new UniqueEntityID(orderId));

    if (!order) {
      response.failures = {
        invalidOrderId: true
      };

      return this._presenter.show(response);
    }

    response.success = {
      id: order.id.toString(),
      billingAddress: order.billingAddress.toValue(),
      lineItems: this._mapLineItem(order.lineItems),
      buyer: this._mapCustomer(order.buyer)
    };

    if (!!order.charge) {
      response.success.charge = order.charge.toValue()
    }

    return this._presenter.show(response);
  }
}


