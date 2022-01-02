import { Router } from 'express';
import executeRule from '../execute-rule';

const router = Router();

router.route('/:id')
  .get(executeRule('detailOrder'));

router.route('/')
  .post(executeRule('generateOrder'));

router.route('/:order_id/invoice')
  .patch(executeRule('generateOrderInvoice'));

export default router;
