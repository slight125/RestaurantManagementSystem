import { Router } from 'express';
import {
  getAllComments,
  createComment,
  updateComment,
  deleteComment
} from '../controllers/commentController';

const router = Router();

router.get('/', getAllComments);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
