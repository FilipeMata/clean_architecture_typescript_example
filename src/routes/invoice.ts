import { Request, Response, Router } from 'express';
import detailInvoice from '@infrastructure/actions/detail-invoice.express';

// Init shared
const router = Router();

router.route('/:id')
  .get(detailInvoice);

export default router;
