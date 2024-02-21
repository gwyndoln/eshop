import { StatusCodes } from 'http-status-codes';
import { Comment } from './../models/Comment';
import { Request, Response, NextFunction } from 'express';

const createSubComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { text, userId } = req.body;
		const { commentId } = req.params;

		const comment = await Comment.findOne({ where: { uuid: commentId } });

		if (!comment) {
			return next();
		}

		const subComment = await Comment.create(
			{ text, mainCommentId: comment.id, userId },
			{ fields: ['uuid', 'text', 'mainCommentId', 'userId'] }
		);

		const mainComment = await subComment.$get('mainComment');
		//const subComments = await mainComment?.$get('childComments');
		const user = await subComment.$get('user');

		return res.status(StatusCodes.OK).json({ subComment, mainComment, user });
	} catch (error) {
		next(error);
	}
};

const getSubComments = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { commentId } = req.params;
		const comment = await Comment.findOne({ where: { uuid: commentId } });

		if (!comment) {
			next();
		}

		const subComments = await comment?.$get('subComments');

		res.status(StatusCodes.OK).json({ subComments });
	} catch (error) {
		next(error);
	}
};

const editSubComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { commentId } = req.params;
		const { text } = req.body;

		let comment = await Comment.findOne({ where: { uuid: commentId } });

		if (!comment) {
			return next();
		}

		if (text) {
			comment = await comment.update({ text });
		}

		return res.status(StatusCodes.OK).json({ comment });
	} catch (error) {
		next(error);
	}
};

export { createSubComment, getSubComments, editSubComment };
