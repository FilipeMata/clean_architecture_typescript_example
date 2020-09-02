import { Order, Address, UniqueEntityID } from '@entities';
import OutputPort from '../../output-port';
import { GenerateOrder } from '@aplication/useCases';

export class GenerateOrderInteractor {
  private _gateway: GenerateOrder.GenerateOrderGateway;
  private _presenter: OutputPort<GenerateOrder.GenerateOrderResponseDTO>;

  constructor(
    gateway: GenerateOrder.GenerateOrderGateway,
    presenter: OutputPort<GenerateOrder.GenerateOrderResponseDTO>
  ) {
    this._gateway = gateway;
    this._presenter = presenter;
  }

  public async execute(data: GenerateOrder.GenerateOrderRequestDTO) {
    let billingAddress: Address | undefined;

    if(!!data.billingAddress) {
      const billingAddressOrError = Address.build(data.billingAddress);
      
      if(!billingAddressOrError.succeeded) {
        return this._presenter.show({
          success: false,
          failures: ['missing_billing_address']
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
      console.log('>>>>>>>>>>>>>>>>>', err);
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