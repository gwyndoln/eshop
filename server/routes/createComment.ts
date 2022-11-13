import { Router } from 'express';
import { createComment, createSubComment } from '../controllers/createComment';
import commentParser from '../middleware/formParser';
import { commentValidation } from '../validation/commentValidaton';

const router = Router();

router.post('/createComment', commentParser, commentValidation, createComment);
router.post('/createSubComment', commentValidation, createSubComment);

export default router;
