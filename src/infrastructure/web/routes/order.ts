import { Request, Response, Router } from 'express';
import detailOrder from '@infrastructure/web/actions/detail-order';

// Init shared
const router = Router();

router.route('/:id')
  .get(detailOrder);

export default router;
