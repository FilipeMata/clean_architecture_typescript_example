import { OutputPort, GenerateOrderInvoice } from '@useCases';

type GenerateOrderInvoiceHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export class HTTPGenerateOrderInvoicePresenter implements OutputPort<GenerateOrderInvoice.GenerateOrderInvoiceResponseDTO>{
  private _view: GenerateOrderInvoiceHTTPView;

  get view(): GenerateOrderInvoiceHTTPView {
    return this._view;
  } 

  public show(response: GenerateOrderInvoice.GenerateOrderInvoiceResponseDTO) {
    if (response.failures) {
      this._view = {
        statusCode: 500,
        message: 'Unexpected Error'
      };
      return;
    }

    /** Treat other failures here */

    this._view = {
      statusCode: 200
    };

    return;
  }
};
