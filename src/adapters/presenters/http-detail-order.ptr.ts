import { OutputPort, DetailOrder } from '@useCases';

type DetailOrderHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export class HTTPDetailOrderPresenter implements OutputPort<DetailOrder.DetailOrderResponseDTO>{
  private _view: DetailOrderHTTPView;

  get view(): DetailOrderHTTPView {
    return this._view;
  } 

  public show(response: DetailOrder.DetailOrderResponseDTO) {
    if (response.failures) {
      this._view = {
        statusCode: 500,
        message: 'Unexpecet server error'
      };
      
      return;
    }

    this._view = {
      statusCode: 200,
      body: {
        data: response.success
      }
    };

    return;
  }
};
