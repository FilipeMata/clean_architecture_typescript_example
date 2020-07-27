import { Request, Response, NextFunction } from 'express';
import DetailInvoiceInputPort  from '../../application/use-cases/detail-invoice/detail-invoice.input';
import express from 'express';

type DetailInvoiceControllerDTO = {
  req: Request;
  res: Response;
  detailInvoiceInteractor: DetailInvoiceInputPort
};

export default class DetailInvoiceController {
  private _req: Request;
  private _res: Response;
  private _detailInvoiceInteractor: DetailInvoiceInputPort

  constructor(input: DetailInvoiceControllerDTO) {
    this._req = input.req;
    this._res = input.res;
    this._detailInvoiceInteractor = input.detailInvoiceInteractor;
  }

  async run() {
      const response = await (await this._detailInvoiceInteractor.execute(this._req.params.id)).value;

      this._res.status(200)
        .json(response);
  }
};
