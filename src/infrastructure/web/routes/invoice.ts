import { Request, Response, Router } from 'express';
import detailInvoice from '@infrastructure/web/actions/detail-invoice';

// Init shared
const router = Router();

router.route('/:id')
  .get(detailInvoice);

export default router;
