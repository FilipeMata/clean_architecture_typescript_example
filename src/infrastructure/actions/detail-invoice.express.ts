import SequelizeProductRepository from '@adapters/repositories/sequelize-product.rep';
import SequelizeCustomerRepository from '@adapters/repositories/sequelize-customer.rep';
import SequelizeLineItemRepository from '@adapters/repositories/sequelize-line-item.rep';
import DetailInvoiceAPIPresenter from '@adapters/presenters/detail-invoice.api.ptr';
import SequelizeInvoiceRepository from '@adapters/repositories/sequelize-invoice.rep';
import { Request, Response } from 'express';
import DetailInvoiceInteractor from '../../application/use-cases/detail-invoice/detail-invoice.interactor';
import DetailInvoiceController from '../../adapters/controllers/detail-invoice.ctrl';
 
export default async function detailInvoice(req: Request, res: Response) {
  const productRep = new SequelizeProductRepository();
  const customerRep = new SequelizeCustomerRepository();
  const lineItemRepository = new SequelizeLineItemRepository();
  const detailInvoicePresenter = new DetailInvoiceAPIPresenter(res);
  const invoiceRep = new SequelizeInvoiceRepository(lineItemRepository);

  const detailInvoiceInteractor = new DetailInvoiceInteractor(
    invoiceRep,
    customerRep,
    productRep,
    detailInvoicePresenter
  );

  const detailInvoiceControllerInput = {
    req: req,
    res: res,
    detailInvoiceInteractor
  };

  const detailInvoiceController = new DetailInvoiceController(detailInvoiceControllerInput);

  detailInvoiceController.run();

}
