import { Router, Request, Response } from 'express';
import { createOrder } from '../controllers/orderController';
const router = Router(); router.post('/', createOrder);
export default router;