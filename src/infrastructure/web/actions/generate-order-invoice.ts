import { GerencianetInvoiceGateway } from '@infrastructure/plugins/gerencianet/gerencianet-invoice.gateway';
import { Gateways, Presenters, Controllers } from '@adapters';
import { GenerateOrderInvoice, GetOrderData } from '@useCases';
import { Request, Response } from 'express';
import { SequelizeDataMappers } from '@infrastructure/plugins/sequelize-data-mappers'
const models = require('./../../db/models');

const dataMappers = new SequelizeDataMappers(models);

export default async function generateOrder(req: Request, res: Response) {
  const getOrderDataGateway = new Gateways.GetOrderDataGateway({
    dataMappers: dataMappers
  });
  const getOrderDataInteractor = new GetOrderData.GetOrderDataInteractor(getOrderDataGateway);
  const gerencianetInvoiceGateway = new GerencianetInvoiceGateway();
  const generateOrderInvoicePresenter = new Presenters.HTTPGenerateOrderInvoicePresenter();
  const generateOrderInvoiceGateway = new Gateways.GenerateOrderInvoiceGateway({ invoiceGateway: gerencianetInvoiceGateway, dataMappers: dataMappers });

  const generateOrderInvoiceInteractor = new GenerateOrderInvoice.GenerateOrderInvoiceInteractor(
    getOrderDataInteractor,
    generateOrderInvoiceGateway,
    generateOrderInvoicePresenter
  );

  const generateOrderInvoiceController = new Controllers.HTTPGenerateOrderInvoiceController(req, generateOrderInvoiceInteractor);

  await generateOrderInvoiceController.run();
  const view = generateOrderInvoicePresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
