import express from 'express';
import {
	register,
	confirmation,
	login,
	showLogin,
	logout,
} from '../controllers/auth';
import isAuthenticated from '../middleware/isAuthenticated';
import { userValidation } from '../validation/userValidator';

const router = express.Router();

router.post('/register', userValidation, register);
router.get('/confirmation/:emailToken', confirmation);
router.post('/login', userValidation, login);
router.post('/logout', logout);
router.get('/login', isAuthenticated, showLogin);

export default router;
