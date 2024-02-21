import { Router } from 'express';
import authRouter from './auth';
import commentRouter from './comment';
import subCommentRouter from './subComment';
import productRouter from './product';
import typeRouter from './type';
import isAuthenticated from '../middleware/isAuthenticated';

const router = Router();

//app.use(isAuthenticated);
router
	.use('/auth', authRouter)
	.use('/comment', commentRouter)
	.use('/subComment', subCommentRouter)
	.use('/product', productRouter)
	.use('/type', typeRouter)

export default router;
