import { Router } from 'express';
import InvoiceRouter from './invoice';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/invoice', InvoiceRouter);

// Export the base-router
export default router;
