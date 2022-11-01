import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/api-error';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session.user) {
		return next(ApiError.Unauthorized('Пользователь не залогинился'));
	}

	next();
};

export default isAuthenticated;
