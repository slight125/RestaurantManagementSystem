import { Router } from 'express';
import { getDashboardAnalytics, getUserAnalytics } from '../controllers/analyticsController';

const router = Router();

router.get('/dashboard', getDashboardAnalytics);
router.get('/user/:userId', getUserAnalytics);

export default router;
