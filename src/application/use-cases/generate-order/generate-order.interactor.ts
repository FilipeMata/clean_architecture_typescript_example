import { LineItem, Order, Address, UniqueEntityID } from '@entities';

import { Result } from '@shared/Result';
import OutputPort from 'src/application/output-port';
import GenerateOrderRequestDTO from './generate-order-request.dto';
import GenerateOrderGateway from './generate-order.gateway';
import GenerateOrderResponseDTO from './generate-order-response.dto'

class GenerateOrderInteractor {
  private _gateway: GenerateOrderGateway;
  private _presenter: OutputPort<GenerateOrderResponseDTO>;

  constructor(
    gateway: GenerateOrderGateway,
    presenter: OutputPort<GenerateOrderResponseDTO>
  ) {
    this._gateway = gateway;
    this._presenter = presenter;
  }

  public async execute(data: GenerateOrderRequestDTO): Promise<Result<void>> {

    let billingAddress: Address | undefined;

    if(!!data.billingAddress) {
      const billingAddressOrError = Address.build(data.billingAddress);
      
      if(!billingAddressOrError.succeeded) {
        return Result.fail<void>(billingAddressOrError.errors);
      }

      billingAddress = billingAddressOrError.value;
    }

    const customer = await this._gateway
      .getCustomerById(data.customerId);

    if (!customer) {
      return Result.fail<void>(`Couldn't find customer`)
    }

    if (data.shouldConsiderCustomerAddressForBilling) {
      billingAddress = customer.address;
    }

    if (!billingAddress) {
      return Result.fail<void>(`Order billing address is required`);
    }

    const orderResult = Order.build({
      billingAddress: billingAddress,
      customerId: customer.id
    });

    if (!orderResult.succeeded) {
      return Result.fail<void>(orderResult.errors);
    }

    const order = orderResult.value;

    for (const item of data.items) {

      let lineItemResult = LineItem.build({
        productId: new UniqueEntityID(item.productId),
        quantity: item.quantity
      });

      if (!lineItemResult.succeeded){
        return Result.fail<void>(lineItemResult.errors);
      }

      let lineItem = lineItemResult.value;

      order.addLineItem(lineItem);
    }

    await this.orderRep.save(order);

    return Result.success<void>();
  }

}

export { GenerateOrderInteractor };