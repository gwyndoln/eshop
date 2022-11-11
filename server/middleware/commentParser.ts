import { Request, Response, NextFunction } from 'express';
import formidable from 'formidable';
import path from 'path';
import ApiError from '../error/api-error';

const commentParser = (req: Request, res: Response, next: NextFunction) => {
	const form = formidable({
		allowEmptyFiles: false,
		uploadDir: path.resolve(__dirname, '..', 'files'),
		multiples: true,
		maxFileSize: 50 * 1024 * 1024, //50mb
		minFileSize: 50 * 1024, // 50kb
		keepExtensions: true,
		maxFields: 4,
	});

	form.onPart = (part) => {
		const allowedImageTypes = ['image/jpeg', 'image/png'];
		const allowedVideoTypes = ['video/mp4', 'video/webm'];
		const imageRegExp = /\.(jpeg|jpg|png)$/;
		const VideoRegExp = /\.(mp4|webm)$/;

		const checkFileType = (
			file: formidable.Part,
			regexp: RegExp,
			allowedTypes: String[]
		) => {
			if (
				file.mimetype &&
				allowedTypes.includes(file.mimetype) &&
				file.originalFilename &&
				file.originalFilename.match(regexp)
			) {
				form._handlePart(part);
				return;
			}
			return next(ApiError.UnsuportedMedia('Неправильный тип данных'));
		};

		if (part.name === 'image') {
			return checkFileType(part, imageRegExp, allowedImageTypes);
		}

		if (part.name === 'video') {
			return checkFileType(part, VideoRegExp, allowedVideoTypes);
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
