import { Router } from 'express';
import { createProduct } from '../controllers/createProduct';
import productParser from '../middleware/formParser';

const router = Router();

router.post('/createProduct', productParser, createProduct);

export default router;
