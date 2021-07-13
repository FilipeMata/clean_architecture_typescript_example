import { UniqueEntityID } from '@entities';
import GenerateOrderInvoiceGateway from './generate-order-invoice.gateway';
import Interactor from '@useCases/common/interactor';
import Presenter from '@useCases/common/presenter';
import { GetOrderDataInteractor } from '@useCases/common/get-order-data';

interface GenerateOrderInvoiceInteractorParams {
  getOrderDataInteractor: GetOrderDataInteractor,
  generateOrderInvoiceGateway: GenerateOrderInvoiceGateway,
  generateOrderInvoicePresenter: Presenter<void>
}

export default class GenerateOrderInvoiceInteractor extends Interactor<string, void> {
  private _getOrderDataInteractor: GetOrderDataInteractor;
  private _gateway: GenerateOrderInvoiceGateway;

  constructor(params: GenerateOrderInvoiceInteractorParams) {
    super(params.generateOrderInvoicePresenter);
    this._getOrderDataInteractor = params.getOrderDataInteractor;
    this._gateway = params.generateOrderInvoiceGateway;
  }

  protected async execute(orderId: string) {
    await this._gateway.startTransaction();

    const order = await this._gateway
      .findOrderById(new UniqueEntityID(orderId));

    const orderData = await this._getOrderDataInteractor
      .execute(order);
    
    const invoice = await this._gateway
      .generateInvoice(orderData);

    order.addInvoice(invoice);

    await this._gateway.saveOrder(order);
    await this._gateway.endTransaction();
  }
}
