import * as Adapters from '@adapters';
import { GenerateOrder } from '@useCases';
import { Request, Response } from 'express';
 
export default async function generateOrder(req: Request, res: Response) {
  const generateOrderPresenter = new Adapters.Presenters.HTTPGenerateOrderPresenter();
  const generateOrderGateway = new Adapters.Gateways.GenerateOrderGateway();

  const generateOrderInteractor = new GenerateOrder.GenerateOrderInteractor(
    generateOrderGateway,
    generateOrderPresenter
  );

  const generateOrderController = new Adapters.Controllers.HTTPGenerateOrderController(req, generateOrderInteractor);

  await generateOrderController.run();
  const view = generateOrderPresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
