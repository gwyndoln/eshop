import { Router } from 'express';
import {
	createComment,
	editComment,
	getComments,
} from '../controllers/comment';
import commentParser from '../middleware/commentParser';
import editCommentParser from '../middleware/editCommentParser';
import { commentValidatior } from '../validation/commentValidator';

const router = Router();

router
	.post('/:productCode', commentParser, commentValidatior, createComment)
	.get('/:productCode', getComments)
	.patch('/', editCommentParser, commentValidatior, editComment);

export default router;
