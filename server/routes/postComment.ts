import { Router } from 'express';
import { postComment, postSubComment } from '../controllers/postComment';
import commentParser from '../middleware/commentParser';
import { commentValidation } from '../validation/commentValidaton';

const router = Router();

router.post('/postComment', commentParser, commentValidation, postComment);
router.post('/postSubComment', commentValidation, postSubComment);

export default router;
