import { Product } from './../models/Product';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Comment } from '../models/Comment';
import { ICommentFields, ICommentForm } from '../types/types';
import getFileNames from '../functions/getFileNames';
import { PathLike, unlink } from 'fs';
import path from 'path';
import deleteOldFiles from '../functions/deleteOldFiles';

const createComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { text, userId, image, video }: ICommentForm = req.body;
		const { productCode } = req.params;

		const product = await Product.findOne({ where: { code: productCode } });

		if (!product) {
			return next();
		}

		const commentFields: ICommentFields = [
			{ text, userId, productId: product.id },
			{ fields: ['uuid', 'text', 'userId', 'productId'] },
		];

		if (image) {
			commentFields[0].images = getFileNames(image);
			commentFields[1].fields.push('images');
		}

		if (video) {
			commentFields[0].videos = getFileNames(video);
			commentFields[1].fields.push('videos');
		}

		const comment = await Comment.create(...commentFields);
		const user = await comment.$get('user');

		return res.status(StatusCodes.OK).json({ comment, user, product });
	} catch (err) {
		next(err);
	}
};

const getComments = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { productCode } = req.params;
		const product = await Product.findOne({ where: { code: productCode } });

		if (!product) {
			return next();
		}

		const comments = await product?.$get('comments');

		return res.status(StatusCodes.OK).json({ comments });
	} catch (error) {
		next(error);
	}
};

const editComment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let { text, commentId, image, video, editedVideos, editedImages } =
			req.body;
		let comment = await Comment.findOne({ where: { uuid: commentId } });

		if (!comment) {
			return next();
		}

		const filesDir = path.resolve(__dirname, '..', 'files');
		editedImages = editedImages !== '' ? editedImages.split(';') : []; //empty value?
		editedVideos = editedVideos !== '' ? editedVideos.split(';') : []; //empty value?
		const oldImages = comment.images || [];
		const oldVideos = comment.videos || [];

		if (text) {
			comment.set({ text });
		}

		deleteOldFiles(unlink, filesDir, oldImages, editedImages);
		deleteOldFiles(unlink, filesDir, oldVideos, editedVideos);

		if (image || editedImages) {
			editedImages = image
				? editedImages.concat(getFileNames(image))
				: editedImages;

			comment.set({ images: editedImages });
		}

		if (video || editedVideos) {
			editedVideos = video
				? editedVideos.concat(getFileNames(video))
				: editedVideos;

			comment.set({ videos: editedVideos });
		}

		comment = await comment.save();
		return res.status(StatusCodes.OK).json({ comment });
	} catch (error) {
		next(error);
	}
};

export { createComment, getComments, editComment };
