import * as Adapters from '@adapters';
import { DetailOrder } from '@useCases';

import { Request, Response } from 'express';
 
export default async function detailOrder(req: Request, res: Response) {
  const detailOrderPresenter = new Adapters.Presenters.HTTPDetailOrderPresenter();
  const detailOrderGateway = new Adapters.Gateways.DeatailOrderGateway();

  const detailOrderInteractor = new DetailOrder.DetailOrderInteractor(
    detailOrderGateway,
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
