import { DetailOrderResponseDTO } from './detail-order-response.dto';
import * as DetailOrderMapper from './detail-order.mapper';
import DetailOrderInputPort  from './detail-order.input';
import { UniqueEntityID } from '@entities';
import OutputPort from '../../output-port';
import DetailOrderGateway from './detail-order.gateway';

export default class DetailOrderInteractor implements DetailOrderInputPort {
  private _gateway: DetailOrderGateway;
  private _presenter: OutputPort<DetailOrderResponseDTO>;

  constructor(
    gateway: DetailOrderGateway,
    presenter: OutputPort<DetailOrderResponseDTO>
  ) {
    this._gateway = gateway;
    this._presenter = presenter;
  }

  public async execute(orderId: string) {
    let response: DetailOrderResponseDTO = {};

    const order = await this._gateway
      .findOrderById(new UniqueEntityID(orderId));

    if (!order) {
      response.failures = {
        invalidOrderId: true
      };

      return this._presenter.show(response);
    }5


    const itemsDTO = [];
    for (const lineItem of order.lineItems) {
      const product = await this._gateway
        .findProductById(lineItem.productId);

      const item = {
        id: lineItem.id.toString(),
        product: DetailOrderMapper.mapProductToDetailOrderResponseProductDTO(product),
        quantity: lineItem.quantity
      };

      itemsDTO.push(item);
    }

    const customer = await this._gateway
      .findCustomerById(order.customerId);

    response.success = {
      id: order.id.toString(),
      billingAddress: order.billingAddress.toValue(),
      lineItems: itemsDTO,
      customer: DetailOrderMapper.mapCustomerToDetailOrderResponseCustomerDTO(customer)
    };

    if (!!order.charge) {
      response.success.charge = DetailOrderMapper.mapChargeToDetailOrderResponseChargeDTO(order.charge)
    }

    return this._presenter.show(response);
  }
}


