import { ApplicationError } from '@useCases/common/errors';
import Presenter from '@useCases/common/presenter';
import { HTTPResponseHandler } from '@adapters/common/types/http-response';

interface HTTPGenerateOrderInvoicePresenterParams{
  httpResponseHandler: HTTPResponseHandler<void>
}

export default class HTTPGenerateOrderInvoicePresenter implements Presenter<void> {
  private _responseHandler: HTTPResponseHandler<void>;

  constructor(params: HTTPGenerateOrderInvoicePresenterParams) {
    this._responseHandler = params.httpResponseHandler;
  }

  public showSuccess() {
    return this._responseHandler.send({
      statusCode: 204
    });
  }

  public showError(error: Error) {

    if (error instanceof ApplicationError && error.code === 'order_not_found') {
      return this._responseHandler.send({
        statusCode: 404,
        message: 'Order not found'
      });
    }

    return this._responseHandler.send({
      statusCode: 500,
      message: 'Unexpected server error'
    });
  }
};
