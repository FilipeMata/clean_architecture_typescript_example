import * as Gateways from '@aplication/gateways';
import { DetailOrderInputPort } from '@aplication/useCases/detail-order/detail-order.interactor'; 

import { Result } from '@shared/Result';
import { UniqueEntityID } from 'src/entities/unique-entity-id';

import { Order, Address, LineItem } from '@entities';

class ChargeOrderInteractor {
  private orderRep: Gateways.OrderRepository;
  private thirdPartyPaymentGateway: Gateways.ThirdPartyPaymentService;
  private detailOrderInteractor: DetailOrderInputPort;

  constructor(
    orderRep: Gateways.OrderRepository,
    thirdPartyPaymentGateway: Gateways.ThirdPartyPaymentService,
    detailOrderInteractor: DetailOrderInputPort
  ) {
    this.orderRep = orderRep;
    this.thirdPartyPaymentGateway = thirdPartyPaymentGateway;
    this.detailOrderInteractor = detailOrderInteractor;
  }

  public async execute(orderId: string): Promise<Result<void>> {
    const orderResult = await this.detailOrderInteractor
      .execute(orderId);

    if(!orderResult.succeeded) {
      return Result.fail<void>(orderResult.errors);
    }

    const orderDTO = orderResult.value;
    
    const order = Order.build({
      billingAddress: Address.build(orderDTO.billingAddress).value,
      customerId: new UniqueEntityID(orderDTO.customer.id),
    }, new UniqueEntityID(orderDTO.id)).value;

    const generateChargeItemDTO = [];

    for (const item of orderDTO.lineItems) {

      generateChargeItemDTO.push({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      });

      const lineItem = LineItem.build({
        productId: new UniqueEntityID(item.product.id),
        quantity: item.quantity
      }, new UniqueEntityID(item.id)).value;

      order.addLineItem(lineItem);
    }

    if (!!orderDTO.charge) {
      Result.fail<void>('Charge already exists for order');
    }

    
    const generateChargeDTO: Gateways.GenerateChargeDTO = {
      billingAddress: order.billingAddress.toValue(),
      customer: {
        document: orderDTO.customer.document,
        name: orderDTO.customer.name,
        cellphone: orderDTO.customer.cellphone,
        email: orderDTO.customer.email,
        birthdate: orderDTO.customer.birthdate
      },
      items: generateChargeItemDTO
    }

    let charge;
    try {
      charge = await this.thirdPartyPaymentGateway
        .generateCharge(generateChargeDTO);
    } catch(err) {
      return Result.fail<void>(err.message);
    }

    order.linkCharge(charge);

    await this.orderRep.save(order);

    return Result.success<void>();
  }
}

export { ChargeOrderInteractor };
