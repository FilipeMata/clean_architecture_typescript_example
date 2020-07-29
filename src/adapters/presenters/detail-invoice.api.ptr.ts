import OutputPort from '../../application/output-port';
import { DetailInvoiceResponseDTO } from '../../application/use-cases/detail-invoice/detail-invoice-response.dto';
import { Response } from 'express';

export default class DetailInvoiceAPIPresenter implements OutputPort<DetailInvoiceResponseDTO>{
  private _res: Response;

  constructor(res: Response) {
    this._res = res;
  }

  async show(response: DetailInvoiceResponseDTO) {
    if (response.failures && response.failures.invalidInvoiceId) {
      this._res.status(404)
        .end('Not Found');
    }

    
    this._res.status(200)
      .json(response.success);
  }
};
