import { Router } from 'express';
import OrderRouter from './order';

const router = Router();

router.use('/orders', OrderRouter);

export default router;
