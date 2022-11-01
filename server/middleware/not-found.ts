import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../error/api-error';

const notFound = (req: Request, res: Response, next: NextFunction) => {
	return next(ApiError.notFound('Not found'));
};

export default notFound;
