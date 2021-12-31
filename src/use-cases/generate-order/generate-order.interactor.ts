import { Order, Address, UniqueEntityID } from '@entities';
import GenerateOrderGateway from './generate-order.gateway';
import GenerateOrderRequestDTO from './generate-order.dtos';
import Interactor from '@useCases/common/interactor';
import Presenter from '@useCases/common/presenter';
import { ApplicationError } from '@useCases/common/errors';
import { GetOrderDataInteractor, OrderData } from '@useCases/common/get-order-data';

interface GenerateOrderInteractorParams {
  generateOrderGateway: GenerateOrderGateway,
  generateOrderPresenter: Presenter<void>,
  getOrderDataInteractor: GetOrderDataInteractor
}

export default class GenerateOrderInteractor extends Interactor<GenerateOrderRequestDTO, OrderData>{
  private _gateway: GenerateOrderGateway;
  private _getOrderDataInteractor: GetOrderDataInteractor;

  constructor(params: GenerateOrderInteractorParams) {
    super(params.generateOrderPresenter)
    this._gateway = params.generateOrderGateway;
    this._getOrderDataInteractor = params.getOrderDataInteractor;
  }

  protected async execute(data: GenerateOrderRequestDTO) {
    let billingAddress: Address | undefined;

    if(!!data.billingAddress) {
      billingAddress = Address.build(data.billingAddress);
    }

    const customer = await this._gateway
      .findCustomerById(new UniqueEntityID(data.customerId));

    if (!customer) {
      throw new ApplicationError('customer_not_found');
    }

    if (data.shouldConsiderCustomerAddressForBilling) {
      billingAddress = customer.address;
    }

    if (!billingAddress) {
      throw new ApplicationError('missing_order_billing_address');
    }

    const order = Order.build({
      billingAddress: billingAddress,
      lineItems: data.items,
      buyerId: customer.id
    });

    try {
      await this._gateway.startTransaction();
      await this._gateway.saveOrder(order);
      await this._gateway.commitTransaction();
    } catch(err) {
      await this._gateway.rollbackTransaction();
      throw err;
    }

    return await this._getOrderDataInteractor
      .execute(order);
  }
}