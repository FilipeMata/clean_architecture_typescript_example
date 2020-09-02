import * as Adapters from '@adapters';
import * as UseCases from '@aplication/useCases';

import { Request, Response } from 'express';

const GenerateOrder = UseCases.GenerateOrder;
const GenerateOrderInteractor = GenerateOrder.GenerateOrderInteractor;
 
export default async function generateOrder(req: Request, res: Response) {
  const generateOrderPresenter = new Adapters.HTTPPresenters.HTTPGenerateOrderPresenter();
  const generateOrderGateway = new Adapters.Gateways.GenerateOrderGateway();

  const generateOrderInteractor = new GenerateOrderInteractor(
    generateOrderGateway,
    generateOrderPresenter
  );

  const generateOrderController = new Adapters.APIControllers.HttpGenerateOrderController.default(req, generateOrderInteractor);

  await generateOrderController.run();
  const view = generateOrderPresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
