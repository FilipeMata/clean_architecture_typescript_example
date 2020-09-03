import * as Adapters from '@adapters';
import { DetailOrder } from '@useCases';
import { GetOrderDataInteractor } from '@useCases/common/get-order-data';

import { Request, Response } from 'express';

const getOrderDataGateway = new Adapters.Gateways.GetOrderDataGateway();
const getOrderDataInteractor = new GetOrderDataInteractor(getOrderDataGateway);

export default async function detailOrder(req: Request, res: Response) {
  const detailOrderPresenter = new Adapters.Presenters.HTTPDetailOrderPresenter();

  const detailOrderInteractor = new DetailOrder.DetailOrderInteractor(
    getOrderDataInteractor,
    detailOrderPresenter
  );

  const detailOrderController = new Adapters.Controllers.HttpDetailOrderController(req, detailOrderInteractor);

  await detailOrderController.run();
  const view = detailOrderPresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
