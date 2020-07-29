import { Request, Response } from 'express';
import DetailInvoiceInputPort  from '../../application/use-cases/detail-invoice/detail-invoice.input';

type DetailInvoiceControllerDTO = {
  req: Request;
  res: Response;
  detailInvoiceInteractor: DetailInvoiceInputPort
};

export default class DetailInvoiceController {
  private _req: Request;
  private _detailInvoiceInteractor: DetailInvoiceInputPort

  constructor(input: DetailInvoiceControllerDTO) {
    this._req = input.req;
    this._detailInvoiceInteractor = input.detailInvoiceInteractor;
  }

  async run() {
      await (await this._detailInvoiceInteractor.execute(this._req.params.id));
  }
};
