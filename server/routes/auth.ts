import express from 'express';
import { register, confirmation, login, showLogin } from '../controllers/auth';
import { userValidation } from '../validation/userValidator';

const router = express.Router();

router.post('/register', userValidation, register);
//router.get('/register', userValidator, register);
router.get('/confirmation/:emailToken', confirmation);
router.get('/login', showLogin);
router.post('/login', userValidation, login);

export default router;
