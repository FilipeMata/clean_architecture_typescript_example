import SequelizeProductRepository from '@adapters/repositories/sequelize-product.rep';
import SequelizeCustomerRepository from '@adapters/repositories/sequelize-customer.rep';
import SequelizeLineItemRepository from '@adapters/repositories/sequelize-line-item.rep';
import DetailInvoiceAPIPresenter from '@adapters/presenters/detail-invoice.api.ptr';
import SequelizeInvoiceRepository from '@adapters/repositories/sequelize-invoice.rep';
import { Request, Response } from 'express';
import UseCases from '@aplication/useCases';
import DetailInvoiceController from '@adapters/controllers/detail-invoice.ctrl';

const DetailInvoice = UseCases.DetailInvoice;
const DetailInvoiceInteractor = DetailInvoice.DetailInvoiceInteractor.default;
 
export default async function detailInvoice(req: Request, res: Response) {
  const productRep = new SequelizeProductRepository();
  const customerRep = new SequelizeCustomerRepository();
  const lineItemRepository = new SequelizeLineItemRepository();
  const detailInvoicePresenter = new DetailInvoiceAPIPresenter();
  const invoiceRep = new SequelizeInvoiceRepository(lineItemRepository);

  const detailInvoiceInteractor = new DetailInvoiceInteractor(
    invoiceRep,
    customerRep,
    productRep,
    detailInvoicePresenter
  );

  const detailInvoiceController = new DetailInvoiceController(req, detailInvoiceInteractor);

  await detailInvoiceController.run();
  const view = detailInvoicePresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
