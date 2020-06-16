import * as Adapters from '@adapters';
import * as UseCases from '@aplication/useCases';
const db = require('@infrastructure/db/models');

import { Request, Response } from 'express';

const DetailInvoice = UseCases.DetailInvoice;
const DetailInvoiceInteractor = DetailInvoice.DetailInvoiceInteractor.default;
 
export default async function detailInvoice(req: Request, res: Response) {
  const productRep = new Adapters.SQLRepositories.SQLProductRepository.default(db);
  const customerRep = new Adapters.SQLRepositories.SQLCustomerRepository.default(db);
  const invoiceRep = new Adapters.SQLRepositories.SQLInvoiceRepository.default(db);

  const detailInvoicePresenter = new Adapters.HTTPPresenters.HTTPDetailInvoicePresenter.default();
  const detailInvoiceGateway = new Adapters.Gateways.DeatailInvoiceGateway.default(customerRep, productRep, invoiceRep);

  const detailInvoiceInteractor = new DetailInvoiceInteractor(
    detailInvoiceGateway,
    detailInvoicePresenter
  );

  const detailInvoiceController = new Adapters.APIControllers.APIDetailInvoiceController.default(req, detailInvoiceInteractor);

  await detailInvoiceController.run();
  const view = detailInvoicePresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
