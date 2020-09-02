import OutputPort from '../../application/output-port';
import { DetailOrderResponseDTO } from '../../application/use-cases/detail-order/detail-order-response.dto';

type DetailOrderHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export class HTTPDetailOrderPresenter implements OutputPort<DetailOrderResponseDTO>{
  private _view: DetailOrderHTTPView;

  get view(): DetailOrderHTTPView {
    return this._view;
  } 

  public show(response: DetailOrderResponseDTO) {
    if (response.failures && response.failures.invalidOrderId) {
      this._view = {
        statusCode: 404,
        message: 'Not found'
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
