import { Request, Response, NextFunction } from 'express';
import formidable from 'formidable';
import path from 'path';
import ApiError from '../error/api-error';
import checkFileType from '../functions/checkFileType';

const commentParser = (req: Request, res: Response, next: NextFunction) => {
	const form = formidable({
		allowEmptyFiles: false,
		uploadDir: path.resolve(__dirname, '..', 'files'),
		multiples: true,
		maxFileSize: 50 * 1024 * 1024, //50mb
		minFileSize: 50 * 1024, // 50kb
		keepExtensions: true,
	});

	let filesCounter = 0;

	form.onPart = (part) => {
		const allowedImageTypes = ['image/jpeg', 'image/png'];
		const allowedVideoTypes = ['video/mp4', 'video/webm'];
		const imageRegExp = /\.(jpeg|jpg|png)$/;
		const VideoRegExp = /\.(mp4|webm)$/;

		const field = part.name;
		let checkRegExp;
		let allowedFileTypes;

		if (field === 'text' || field === 'userId') {
			return form._handlePart(part);
		}

		if (field === 'image') {
			checkRegExp = imageRegExp;
			allowedFileTypes = allowedImageTypes;
		}

		if (field === 'video') {
			checkRegExp = VideoRegExp;
			allowedFileTypes = allowedVideoTypes;
		}

		const isFileCorrect = checkFileType(
			part,
			checkRegExp as RegExp,
			allowedFileTypes as string[]
		);

		if (!isFileCorrect) {
			return next(ApiError.UnsuportedMedia('Неправильный тип данных'));
		}

		filesCounter++;

		if (filesCounter > 4) {
			return next(ApiError.BadRequest('Слишком много файлов'));
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

export default commentParser;
