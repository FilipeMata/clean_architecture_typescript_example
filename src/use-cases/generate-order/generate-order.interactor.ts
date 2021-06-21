import { Order, Address, UniqueEntityID } from '@entities';
import { GenerateOrderGateway } from './generate-order.ports';
import { GenerateOrderRequestDTO } from './generate-order.dtos';
import Interactor from '@useCases/common/interactor';
import Presenter from '@useCases/common/presenter';
import { ApplicationError } from '@useCases/common/errors';

interface GenerateOrderInteractorParams {
  generateOrderGateway: GenerateOrderGateway,
  generateOrderPresenter: Presenter<void>
}

export default class GenerateOrderInteractor extends Interactor<GenerateOrderRequestDTO, void>{
  private _gateway: GenerateOrderGateway;

  constructor(params: GenerateOrderInteractorParams) {
    super(params.generateOrderPresenter)
    this._gateway = params.generateOrderGateway;
  }

  protected async execute(data: GenerateOrderRequestDTO) {
    let billingAddress: Address | undefined;

    if(!!data.billingAddress) {
      const billingAddressOrError = Address.build(data.billingAddress);
      
      if (!billingAddressOrError.succeeded) {
        throw new ApplicationError('missing_order_billing_address');
      }

      billingAddress = billingAddressOrError.value;
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

    const lineItems = data.items.map((item) => {
      return {
        productId: new UniqueEntityID(item.productId),
        quantity: item.quantity
      }
    });

    const order = Order.build({
      billingAddress: billingAddress,
      lineItems,
      buyerId: customer.id
    });

    await this._gateway.startTransaction();
    await this._gateway.save(order);
    await this._gateway.endTransaction();
  }
}