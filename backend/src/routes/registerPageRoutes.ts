import { Router } from 'express';
import { handleUserRegistration } from '../controllers/registerPageController';

const router = Router();

router.post('/register', (req, res, next) => {
  Promise.resolve(handleUserRegistration(req, res)).catch(next);
});

export default router;
