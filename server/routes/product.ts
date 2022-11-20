import { Router } from 'express';
import {
	createProduct,
	deleteProduct,
	deleteProducts,
	editProduct,
	getProduct,
	getProducts,
} from '../controllers/product';
import productParser from '../middleware/productParser';
import { productValidatior } from '../validation/productValidator';

const router = Router();

router
	.post('/', productParser, productValidatior, createProduct)
	.get('/', getProducts)
	.delete('/', deleteProducts)
	.get('/:productCode', getProduct)
	.patch('/:productCode', editProduct)
	.delete('/:productCode', deleteProduct);

export default router;
