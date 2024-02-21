import { commentValidatior } from './../validation/commentValidator';
import { Router } from 'express';
import {
	createSubComment,
	getSubComments,
	editSubComment,
} from '../controllers/subComment';

const router = Router();

router
	.post('/:commentId', commentValidatior, createSubComment)
	.get('/:commentId', getSubComments)
	.patch('/:commentId', editSubComment);

export default router;
