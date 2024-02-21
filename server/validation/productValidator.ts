import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const productValidatior = [
	body('title').trim().escape(),
	body('price').trim().escape(),
	body('description').trim().escape(),
	body('brand').trim().toLowerCase().escape(),
	body('type').trim().toLowerCase().escape(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ errors: errors.array() });
		}
		next();
	},
];
