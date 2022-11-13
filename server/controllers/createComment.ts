import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Comment } from '../models/Comment';
import { IUserComment } from '../types/types';
import getFilesUri from '../functions/getFilesUri';

const createComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { text, userId, image, video }: IUserComment = req.body;

		let commentFields;

		if (image && video) {
			commentFields = [
				{
					text,
					userId,
					images: getFilesUri(image),
					videos: getFilesUri(video),
				},
				{ fields: ['text', 'userId', 'images', 'videos'] },
			];
		}

		if (image && !video) {
			commentFields = [
				{ text, userId, images: getFilesUri(image) },
				{ fields: ['text', 'userId', 'images'] },
			];
		}

		if (video && !image) {
			commentFields = [
				{ text, userId, videos: getFilesUri(video) },
				{ fields: ['text', 'userId', 'videos'] },
			];
		}

		if (!video && !image) {
			commentFields = [{ text, userId }, { fields: ['text', 'userId'] }];
		}

		if (commentFields) {
			const comment = await Comment.create(commentFields[0], commentFields[1]);

			const user = await comment.$get('user');
			//const subComments = await comment?.$get('subComments');

			return res.status(StatusCodes.OK).json({ comment, user });
		}
	} catch (err) {
		next(err);
	}
};

const createSubComment = async (
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

export { createComment, createSubComment };
