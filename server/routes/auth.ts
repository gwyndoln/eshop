import { Router } from 'express';
import { register, confirmation, login, logout } from '../controllers/auth';
import isAuthenticated from '../middleware/isAuthenticated';
import { userValidation } from '../validation/userValidaton';

const router = Router();

router.post('/register', userValidation, register);
router.get('/confirmation/:emailToken', confirmation);
router.post('/login', userValidation, login);
router.post('/logout', isAuthenticated, logout);

export default router;
