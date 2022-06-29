import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../error/api-error';

const errorHandler = (
	err: Error | ApiError | any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err.name === 'SequelizeUniqueConstraintError') {
		const errMessages = [];
		for (const i of err.errors) {
			errMessages.push(i.message);
		}
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ errors: errMessages.join() });
	}

	if (!(err instanceof ApiError)) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: err.message });
	}

	return res.status(err.statusCode).json({ msg: err.message });
};

export default errorHandler;
