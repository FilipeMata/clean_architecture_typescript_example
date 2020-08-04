import * as Gateways from '@aplication/gateways';
import { LineItem, Order, Address} from '@entities';

import { Result } from '@shared/Result';
import { UniqueEntityID } from '@entities';
import GenerateOrderRequestDTO from './generate-order-request.dto';

class GenerateOrderInteractor {
  private orderRep: Gateways.OrderRepository;
  private customerRep: Gateways.CustomerRepository;

  constructor(
    orderRep: Gateways.OrderRepository,
    customerRep: Gateways.CustomerRepository
  ) {
    this.orderRep = orderRep;
    this.customerRep = customerRep;
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

    const customer = await this.customerRep
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