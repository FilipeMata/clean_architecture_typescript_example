import { GenerateOrderInvoiceInteractor } from '@useCases/generate-order-invoice'
import HTTPRequest from '@adapters/common/models/http-request';

interface HTTPGenerateOrderInvoiceParams {
  order_id: string
}

type HTTPGenerateOrderInvoiceInput = HTTPRequest<HTTPGenerateOrderInvoiceParams, void, void, void>

interface HTTPGenerateOrderInvoiceControllerParams {
  generateOrderInvoiceInteractor: GenerateOrderInvoiceInteractor
}

export default class HTTPGenerateOrderInvoiceController {
  private _interactorr: GenerateOrderInvoiceInteractor

  constructor(params: HTTPGenerateOrderInvoiceControllerParams) {
    this._interactorr = params.generateOrderInvoiceInteractor;
  }

  async run(input: HTTPGenerateOrderInvoiceInput) {
    const orderId = input.params.order_id;
    await this._interactorr.run(orderId);
  }
};
