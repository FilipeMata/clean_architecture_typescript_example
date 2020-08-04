import * as Adapters from '@adapters';
import * as UseCases from '@aplication/useCases';
const db = require('@infrastructure/db/models');

import { Request, Response } from 'express';

const DetailOrder = UseCases.DetailOrder;
const DetailOrderInteractor = DetailOrder.DetailOrderInteractor.default;
 
export default async function detailOrder(req: Request, res: Response) {
  const productRep = new Adapters.SQLRepositories.SQLProductRepository.default(db);
  const customerRep = new Adapters.SQLRepositories.SQLCustomerRepository.default(db);
  const orderRep = new Adapters.SQLRepositories.SQLOrderRepository.default(db);

  const detailOrderPresenter = new Adapters.HTTPPresenters.HTTPDetailOrderPresenter.default();
  const detailOrderGateway = new Adapters.Gateways.DeatailOrderGateway.default(customerRep, productRep, orderRep);

  const detailOrderInteractor = new DetailOrderInteractor(
    detailOrderGateway,
    detailOrderPresenter
  );

  const detailOrderController = new Adapters.APIControllers.APIDetailOrderController.default(req, detailOrderInteractor);

  await detailOrderController.run();
  const view = detailOrderPresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
