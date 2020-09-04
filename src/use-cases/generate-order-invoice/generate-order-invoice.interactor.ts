import { GenerateOrderInvoice, OutputPort } from '@useCases';
import { GetOrderDataInteractor } from '@useCases/common/get-order-data' 
import { UniqueEntityID } from '@entities';

export class GenerateOrderInvoiceInteractor {
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
