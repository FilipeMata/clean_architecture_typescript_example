import { ApplicationError } from '@useCases/common/errors';
import { OrderData } from '@useCases/common/get-order-data';
import Presenter from '@useCases/common/presenter';
import { HTTPResponseHandler } from '@adapters/common/types/http-response';

interface HTTPGenerateOrderPresenterParams{
  httpResponseHandler: HTTPResponseHandler<{
    data: OrderData
  }>
}

export default class HTTPGenerateOrderPresenter implements Presenter<OrderData> {
  private _responseHandler: HTTPResponseHandler<{
    data: OrderData
  }>;

  constructor(params: HTTPGenerateOrderPresenterParams) {
    this._responseHandler = params.httpResponseHandler;
  }

  public showSuccess(response: OrderData) {
    return this._responseHandler.send({
      statusCode: 201,
      body: {
        data: response 
      }
    });
  }

  public showError(error: Error) {
    const heandleApplicationError = (error: ApplicationError) => {

      if (error.code === 'customer_not_found') {

        return this._responseHandler.send({
          statusCode: 403,
          message: 'Forbbiden'
        });
      }

      if (error.code === 'missing_order_billing_address') {

        return this._responseHandler.send({
          statusCode: 400,
          message: 'Missing order billing address'
        });
      }
    }

    if (error instanceof ApplicationError) {
      heandleApplicationError(error);
    }

    return this._responseHandler.send({
      statusCode: 500,
      message: 'Unexpected server error'
    });
  }
};
