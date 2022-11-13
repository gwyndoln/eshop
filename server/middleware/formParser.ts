import { Request, Response, NextFunction } from 'express';
import formidable from 'formidable';
import path from 'path';
import ApiError from '../error/api-error';
import checkFileType from '../functions/checkFileType';

const formParser = (req: Request, res: Response, next: NextFunction) => {
	const form = formidable({
		allowEmptyFiles: false,
		uploadDir: path.resolve(__dirname, '..', 'files'),
		multiples: true,
		maxFileSize: 50 * 1024 * 1024, //50mb
		minFileSize: 50 * 1024, // 50kb
		keepExtensions: true,
	});

	form.onPart = (part) => {
		const allowedImageTypes = ['image/jpeg', 'image/png'];
		const allowedVideoTypes = ['video/mp4', 'video/webm'];
		const imageRegExp = /\.(jpeg|jpg|png)$/;
		const VideoRegExp = /\.(mp4|webm)$/;

		const field = part.name;

		if (field !== 'image' && field !== 'video') {
			return form._handlePart(part);
		}

		const checkRegExp = field === 'image' ? imageRegExp : VideoRegExp;
		const allowedFileTypes =
			field === 'image' ? allowedImageTypes : allowedVideoTypes;

		const isFileCorrect = checkFileType(part, checkRegExp, allowedFileTypes);

		if (!isFileCorrect) {
			return next(ApiError.UnsuportedMedia('Неправильный тип данных'));
		}

		form._handlePart(part);
	};

	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err);
		}

		req.body = { ...fields, ...files };

		next();
	});
};

export default formParser;
