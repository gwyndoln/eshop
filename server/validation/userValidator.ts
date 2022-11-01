import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import ApiError from '../error/api-error';

export const userValidation = [
	body('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Неверный email адрес')
		.escape(),
	body('password')
		.trim()
		.isLength({ min: 8, max: 255 })
		.withMessage('Пароль должен быть не менее 8 символов')
		.escape(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const msgArr = [];
			for (const err of errors.array()) {
				msgArr.push(err.msg);
			}
			next(ApiError.BadRequest(msgArr.join()));
		}
		next();
	},
];
