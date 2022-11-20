import { Router } from 'express';
import { register, confirmation, login, logout } from '../controllers/auth';
import isAuthenticated from '../middleware/isAuthenticated';
import { userValidatior } from '../validation/userValidator';

const router = Router();

router
	.post('/register', userValidatior, register)
	.get('/confirmation/:emailToken', confirmation)
	.post('/login', userValidatior, login)
	.post('/logout', isAuthenticated, logout);

export default router;
