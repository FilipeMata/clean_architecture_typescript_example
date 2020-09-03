import { GenerateOrderInvoice } from '@useCases'

type HTTPGenerateOrderInvoiceInput = {
  params: any,
  headers?: any,
  body: any
}

export class HTTPGenerateOrderInvoiceController {
  private _input: HTTPGenerateOrderInvoiceInput;
  private _generateOrderInteractor: GenerateOrderInvoice.GenerateOrderInvoiceInteractor

  constructor(input: HTTPGenerateOrderInvoiceInput, interactor: GenerateOrderInvoice.GenerateOrderInvoiceInteractor) {
    this._input = input;
    this._generateOrderInteractor = interactor;
  }

  async run() {
    const orderId = this._input.params.order_id;
    await this._generateOrderInteractor.execute(orderId);
  }
};
