import OutputPort from '../../application/output-port';
import { GenerateOrder } from '@aplication/useCases';

type GenerateOrderHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export class HTTPGenerateOrderPresenter implements OutputPort<GenerateOrder.GenerateOrderResponseDTO>{
  private _view: GenerateOrderHTTPView;

  get view(): GenerateOrderHTTPView {
    return this._view;
  } 

  public show(response: GenerateOrder.GenerateOrderResponseDTO) {
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
