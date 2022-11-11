import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const commentValidation = [
	body('text')
		.trim()
		.isLength({ min: 1, max: 1000 })
		.withMessage('Разрешены комментарии не менее 1 и не более 1000 символов')
		.escape(),
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
