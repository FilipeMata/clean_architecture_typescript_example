import { ApplicationError } from '@useCases/common/errors';
import { OrderData } from '@useCases/common/get-order-data';
import Presenter from '@useCases/common/presenter';
import { HTTPResponseHandler } from '@adapters/common/types/http-response';


interface HTTPDetailOrderPresenterParams{
  httpResponseHandler: HTTPResponseHandler<{
    data: OrderData
  }>
}

export default class HTTPDetailOrderPresenter implements Presenter<OrderData>{
  private _responseHandler: HTTPResponseHandler<{
    data: OrderData
  }>;

  constructor(params: HTTPDetailOrderPresenterParams) {
    this._responseHandler = params.httpResponseHandler;
  }

  public showSuccess(response: OrderData) {
    const view = {
      statusCode: 200,
      body: {
        data: response 
      }
    };

    return this._responseHandler.send(view);
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
