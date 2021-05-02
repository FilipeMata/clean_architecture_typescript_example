import { GenerateOrderInvoice, GetOrderData, OutputPort } from '@useCases';
import { UniqueEntityID } from '@entities';

interface GenerateOrderInvoiceInteractorParams {
  getOrderDataInteractor: GetOrderData.GetOrderDataInteractor,
  generateOrderInvoiceGateway: GenerateOrderInvoice.GenerateOrderInvoiceGateway,
  generateOrderInvoicePresenter: OutputPort<GenerateOrderInvoice.GenerateOrderInvoiceResponseDTO>
}

export default class GenerateOrderInvoiceInteractor {
  private _getOrderDataInteractor: GetOrderData.GetOrderDataInteractor;
  private _gateway: GenerateOrderInvoice.GenerateOrderInvoiceGateway;
  private _presenter: OutputPort<GenerateOrderInvoice.GenerateOrderInvoiceResponseDTO>;

  constructor(params: GenerateOrderInvoiceInteractorParams) {
    this._getOrderDataInteractor = params.getOrderDataInteractor;
    this._gateway = params.generateOrderInvoiceGateway;
    this._presenter = params.generateOrderInvoicePresenter;
  }

  public async execute(orderId: string) {
    const order = await this._gateway
      .findOrderById(new UniqueEntityID(orderId));

    const orderDataResult = await this._getOrderDataInteractor
      .execute(order);
    
    if (!orderDataResult.succeeded) {
      return this._presenter.show({
        success: false,
        failures: orderDataResult.errors
      });
    };

    try {
      this._gateway.startTransaction();
      const invoiceData = await this._gateway
        .generateInvoice(orderDataResult.value);

      order.invoice(invoiceData.invoiceNumber, invoiceData.invoiceUrl);

      this._gateway.save(order);
      this._gateway.endTransaction();

      this._presenter.show({
        success: true
      });

    } catch(err) {
      this._presenter.show({
        success: false,
        failures: ['unexpected_failure']
      });
    }
  }
}
