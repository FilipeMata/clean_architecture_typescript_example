import { Router } from 'express';
import OrderRouter from './order';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/order', OrderRouter);

// Export the base-router
export default router;
