import { OutputPort, GenerateOrder } from '@useCases';
import { HTTPResponse, HTTPResponseHandler } from '../common/types';

interface HTTPGenerateOrderPresenterParams{
  httpResponseHandler: HTTPResponseHandler<void>
}

export default class HTTPGenerateOrderPresenter implements OutputPort<GenerateOrder.GenerateOrderResponseDTO>{
  private _responseHandler: HTTPResponseHandler<void>;

  constructor(params: HTTPGenerateOrderPresenterParams) {
    this._responseHandler = params.httpResponseHandler;
  }

  public show(response: GenerateOrder.GenerateOrderResponseDTO) {
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
