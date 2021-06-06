import { Order, Address, UniqueEntityID } from '@entities';
import { GenerateOrderGateway, GenerateOrderPresenter } from './generate-order.ports';
import { GenerateOrderRequestDTO } from './generate-order.dtos';

interface GenerateOrderInteractorParams {
  generateOrderGateway: GenerateOrderGateway,
  generateOrderPresenter: GenerateOrderPresenter
}

export default class GenerateOrderInteractor {
  private _gateway: GenerateOrderGateway;
  private _presenter: GenerateOrderPresenter;

  constructor(params: GenerateOrderInteractorParams) {
    this._gateway = params.generateOrderGateway;
    this._presenter = params.generateOrderPresenter;
  }

  public async execute(data: GenerateOrderRequestDTO) {
    let billingAddress: Address | undefined;

    if(!!data.billingAddress) {
      const billingAddressOrError = Address.build(data.billingAddress);
      
      if(!billingAddressOrError.succeeded) {
        return this._presenter.show({
          success: false,
          failures: ['missing_order_billing_address']
        });
      }

      billingAddress = billingAddressOrError.value;
    }

    const customer = await this._gateway
      .findCustomerById(new UniqueEntityID(data.customerId));

    if (!customer) {
      return this._presenter.show({
        success: false,
        failures: ['customer_not_found']
      });
    }

    if (data.shouldConsiderCustomerAddressForBilling) {
      billingAddress = customer.address;
    }

    if (!billingAddress) {
      return this._presenter.show({
        success: false,
        failures: ['missing_order_billing_address']
      });
    }

    const lineItems = [];

    for (const item of data.items) {
      const product = await this._gateway
        .findProductById(new UniqueEntityID(item.productId));

      lineItems.push({
        product: product,
        quantity: item.quantity
      });
    }

    const orderResult = Order.build({
      billingAddress: billingAddress,
      lineItems: lineItems,
      buyer: customer
    });

    if (!orderResult.succeeded) {
      return this._presenter.show({
        success: false,
        failures: orderResult.errors
      });
    }

    const order = orderResult.value;

    try {
      await this._gateway.startTransaction();
      await this._gateway.save(order);
      await this._gateway.endTransaction();
    } catch (err) {
      return this._presenter.show({
        success: false,
        failures: ['unexpected_failure']
      });
    }

    return this._presenter.show({
      success: true
    });
  }
}