import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import DetailInvoiceController from '../adapters/controllers/detail-invoice.ctrl';
import { GenerateInvoiceInteractor } from 'src/application/use-cases/generate-invoice';
import SequelizeProductRepository from '../adapters/repositories/sequelize-product.rep';
import SequelizeInvoiceRepository from '../adapters/repositories/sequelize-invoice.rep';
import { LineItemRepository } from '../application/gateways/line-item.rep';
import SequelizeLineItemRepository from '../adapters/repositories/sequelize-line-item.rep';
import  DetailInvoiceInteractor  from '../application/use-cases/detail-invoice/detail-invoice.interactor';
import SequelizeCustomerRepository from '@adapters/repositories/sequelize-customer.rep';


// Init shared
const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  
  const productRep = new SequelizeProductRepository();
  const customerRep = new SequelizeCustomerRepository();
  const lineItemRepository = new SequelizeLineItemRepository();
  const invoiceRep = new SequelizeInvoiceRepository(lineItemRepository);

  const detailInvoiceInteractor = new DetailInvoiceInteractor(
    invoiceRep,
    customerRep,
    productRep
  );

  const controllerInput = {
    req: req,
    res: res,
    detailInvoiceInteractor
  };

  const controller = new DetailInvoiceController(controllerInput)
  controller.run();
  //return res.status(OK).json({ id: 1 });
});

export default router;
