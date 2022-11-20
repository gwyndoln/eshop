import { commentValidatior } from './../validation/commentValidator';
import { Router } from 'express';
import { createSubComment, getSubComments } from '../controllers/subComment';

const router = Router();

router
	.post('/:commentId', commentValidatior, createSubComment)
	.get('/:commentId', getSubComments);

export default router;
