import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import ApiError from '../error/api-error';

export const userValidation = [
	body('email')
		.isEmail()
		.withMessage('Неверный email адрес')
		.trim()
		.escape()
		.normalizeEmail(),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Пароль должен быть не менее 8 символов')
		.trim()
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
