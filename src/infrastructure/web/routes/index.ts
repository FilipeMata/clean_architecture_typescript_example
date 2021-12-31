import { Router } from 'express';
import OrderRouter from './order';

const router = Router();

router.use('/order', OrderRouter);

export default router;
