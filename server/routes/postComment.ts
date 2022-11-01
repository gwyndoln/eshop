import express from 'express';
import { postComment, postSubComment } from '../controllers/postComment';

const router = express.Router();

router.post('/postComment', postComment);
router.post('/postSubComment', postSubComment);

export default router;
