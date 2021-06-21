import { GetOrderData } from '@useCases';
import { UniqueEntityID } from '@entities';
import { GenerateOrderInvoiceGateway } from './generate-order-invoice.ports';
import Interactor from '@useCases/common/interactor';
import Presenter from '@useCases/common/presenter';

interface GenerateOrderInvoiceInteractorParams {
  getOrderDataInteractor: GetOrderData.GetOrderDataInteractor,
  generateOrderInvoiceGateway: GenerateOrderInvoiceGateway,
  generateOrderInvoicePresenter: Presenter<void>
}

export default class GenerateOrderInvoiceInteractor extends Interactor<string, void> {
  private _getOrderDataInteractor: GetOrderData.GetOrderDataInteractor;
  private _gateway: GenerateOrderInvoiceGateway;

  constructor(params: GenerateOrderInvoiceInteractorParams) {
    super(params.generateOrderInvoicePresenter);
    this._getOrderDataInteractor = params.getOrderDataInteractor;
    this._gateway = params.generateOrderInvoiceGateway;
  }

  protected async execute(orderId: string) {
    const order = await this._gateway
      .findOrderById(new UniqueEntityID(orderId));

    const orderData = await this._getOrderDataInteractor
      .execute(order);

    await this._gateway.startTransaction();

    const invoiceData = await this._gateway
      .generateInvoice(orderData);

    order.invoice(invoiceData.invoiceNumber, invoiceData.invoiceUrl);

    await this._gateway.save(order);
    await this._gateway.endTransaction();
  }
}
