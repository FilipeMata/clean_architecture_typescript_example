import { Request, Response, Router } from 'express';
import detailOrder from '@infrastructure/web/actions/detail-order';
import generateOrder from '@infrastructure/web/actions/generate-order';
import generateOrderInvoice from '@infrastructure/web/actions/generate-order-invoice';

const router = Router();

router.route('/:id')
  .get(detailOrder);

router.route('/')
  .post(generateOrder);

router.route('/:order_id/invoice')
  .patch(generateOrderInvoice);

export default router;
