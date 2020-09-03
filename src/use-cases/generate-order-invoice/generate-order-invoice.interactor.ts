import { GenerateOrderInvoice, OutputPort } from '@useCases';
import { GetOrderDataInteractor } from '@useCases/common/get-order-data' 

class GenerateOrderInvoiceInteractor {
  private _getOrderDataInteractor: GetOrderDataInteractor;
  private _gateway: GenerateOrderInvoice.GenerateOrderInvoiceGateway;
  private _presenter: OutputPort<GenerateOrderInvoice.GenerateOrderInvoiceResponseDTO>;

  constructor(
    getOrderDataInteractor: GetOrderDataInteractor,
    gateway: GenerateOrderInvoice.GenerateOrderInvoiceGateway,
    presenter: OutputPort<GenerateOrderInvoice.GenerateOrderInvoiceResponseDTO>
  ) {
    this._getOrderDataInteractor = getOrderDataInteractor;
    this._gateway = gateway;
    this._presenter = presenter;
  }

  public async execute(orderId: string) {
    const orderDataResult = await this._getOrderDataInteractor
      .execute(orderId);
    
    if (!orderDataResult.succeeded) {
      return this._presenter.show({
        success: false,
        failures: orderDataResult.errors
      });
    };

    const invoiceData = await this._gateway
      .generateInvoice(orderDataResult.value);
  }
}

export { GenerateOrderInvoiceInteractor };
