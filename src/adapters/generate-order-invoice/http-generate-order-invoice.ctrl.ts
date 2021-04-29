import { GenerateOrderInvoice } from '@useCases'
import { HTTPRequest } from '../common/types';

interface HTTPGenerateOrderInvoiceParams {
  order_id: string
}

type HTTPGenerateOrderInvoiceInput = HTTPRequest<HTTPGenerateOrderInvoiceParams, void, void, void>

interface HTTPGenerateOrderInvoiceControllerParams {
  generateOrderInteractor: GenerateOrderInvoice.GenerateOrderInvoiceInteractor
}

export default class HTTPGenerateOrderInvoiceController {
  private _interactorr: GenerateOrderInvoice.GenerateOrderInvoiceInteractor

  constructor(params: HTTPGenerateOrderInvoiceControllerParams) {
    this._interactorr = params.generateOrderInteractor;
  }

  async run(input: HTTPGenerateOrderInvoiceInput) {
    const orderId = input.params.order_id;
    await this._interactorr.execute(orderId);
  }
};
