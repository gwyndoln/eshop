import { StatusCodes } from 'http-status-codes';
import { Comment } from './../models/Comment';
import { Request, Response, NextFunction } from 'express';

const postComment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { text, userId } = req.body;

		const comment = await Comment.create(
			{ text, userId },
			{ fields: ['text', 'image', 'video', 'userId'] }
		);

		//const subComments = await comment?.$get('subComments');
		const user = await comment.$get('user');

		return res.status(StatusCodes.OK).json({ comment, user });
	} catch (error) {
		next(error);
	}
};

const postSubComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { text, subCommentId, userId } = req.body;

		const subComment = await Comment.create(
			{ text, subCommentId, userId },
			{ fields: ['text', 'subCommentId', 'userId'] }
		);

		const mainComment = await subComment.$get('mainComment');
		//const subComments = await mainComment?.$get('subComments');
		const user = await subComment.$get('user');

		return res.status(StatusCodes.OK).json({ subComment, mainComment, user });
	} catch (error) {
		next(error);
	}
};

export { postComment, postSubComment };
