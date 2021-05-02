import { OutputPort, DetailOrder } from '@useCases';
import { OrderData } from '@useCases/common/dtos';
import { HTTPResponse, HTTPResponseHandler } from '../common/types';

interface HTTPDetailOrderPresenterParams{
  httpResponseHandler: HTTPResponseHandler<{
    data: OrderData
  }>
}

export default class HTTPDetailOrderPresenter implements OutputPort<DetailOrder.DetailOrderResponseDTO>{
  private _responseHandler: HTTPResponseHandler<{
    data: OrderData
  }>;

  constructor(params: HTTPDetailOrderPresenterParams) {
    this._responseHandler = params.httpResponseHandler;
  }

  public show(response: DetailOrder.DetailOrderResponseDTO) {
    let view: HTTPResponse<{
      data: OrderData
    }>;

    if (response.success) {
      view = {
        statusCode: 200,
        body: {
          data: response.success 
        }
      };
    }

    else if (response.failures.includes('order_not_found')) {
      view = {
        statusCode: 404,
        message: 'Not found'
      };
      
      return;
    }

    else {
      view = {
        statusCode: 500,
        message: 'Unexpecet server error'
      };
    }
      
    return this._responseHandler.send(view);
  }
};
