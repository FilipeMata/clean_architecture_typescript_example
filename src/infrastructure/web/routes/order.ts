import { Request, Response, Router } from 'express';
import detailOrder from '@infrastructure/web/actions/detail-order';
import generateOrder from '@infrastructure/web/actions/generate-order';

const router = Router();

router.route('/:id')
  .get(detailOrder);

router.route('/')
  .post(generateOrder);

export default router;
