import { GenerateOrderInvoice } from '@useCases';
import { HTTPResponse, HTTPResponseHandler } from '../common/types';

interface HTTPGenerateOrderInvoicePresenterParams{
  httpResponseHandler: HTTPResponseHandler<void>
}

export default class HTTPGenerateOrderInvoicePresenter implements GenerateOrderInvoice.GenerateOrderInvoicePresenter {
  private _responseHandler: HTTPResponseHandler<void>;

  constructor(params: HTTPGenerateOrderInvoicePresenterParams) {
    this._responseHandler = params.httpResponseHandler;
  }

  public show(response: GenerateOrderInvoice.GenerateOrderInvoiceResponseDTO) {
    let view: HTTPResponse<void>;
    
    if (!response.success) {
      view = {
        statusCode: 500,
        message: 'Unexpected Error'
      };

      /** Treat other failures here */
    }
    else {
      view = {
        statusCode: 200
      };
    }

    return this._responseHandler.send(view);
  }
};
