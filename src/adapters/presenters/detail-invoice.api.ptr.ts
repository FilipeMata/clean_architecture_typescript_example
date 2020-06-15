import OutputPort from '../../application/output-port';
import { DetailInvoiceResponseDTO } from '../../application/use-cases/detail-invoice/detail-invoice-response.dto';

type DetailInvoiceHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export default class DetailInvoiceAPIPresenter implements OutputPort<DetailInvoiceResponseDTO>{
  private _view: DetailInvoiceHTTPView;

  get view(): DetailInvoiceHTTPView {
    return this._view;
  } 

  public show(response: DetailInvoiceResponseDTO) {
    if (response.failures && response.failures.invalidInvoiceId) {
      this._view = {
        statusCode: 404,
        message: 'Not found'
      };
      
      return;
    }

    this._view = {
      statusCode: 200,
      body: response
    };

    return;
  }
};
