import express from 'express';
import admin from '../controllers/admin';

const router = express.Router();

router.get('/', admin);

export default router;
