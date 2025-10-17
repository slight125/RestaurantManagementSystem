import { Router } from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder } from '../controllers/orderController';

const router = Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.patch('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;