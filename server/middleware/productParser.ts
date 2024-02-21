import { Request, Response, NextFunction } from 'express';
import formidable from 'formidable';
import { access, mkdir } from 'node:fs/promises';
import ApiError from '../error/api-error';
import checkFileType from '../functions/checkFileType';
import parseFormPromise from '../functions/parseFormPromise';
import { productUploadDir as uploadDir } from '../variables/variables';

const productParser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await access(uploadDir);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (error) {
        next(error);
      }
    }
  }

  try {
    const form = formidable({
      allowEmptyFiles: false,
      uploadDir,
      multiples: true,
      maxFileSize: 10 * 1024 * 1024, //10mb
      keepExtensions: true,
    });

    form.onPart = (part) => {
      const allowedImageTypes = ['image/jpeg', 'image/png'];
      const imageRegExp = /\.(jpeg|jpg|png)$/;

      if (
        part.name === 'title' ||
        part.name === 'price' ||
        part.name === 'description' ||
        part.name === 'brand' ||
        part.name === 'type'
      ) {
        return form._handlePart(part);
      }

      const isFileCorrect = checkFileType(part, imageRegExp, allowedImageTypes);

      if (!isFileCorrect) {
        return next(ApiError.UnsuportedMedia('Неправильный тип данных'));
      }

      form._handlePart(part);
    };

    const { fields, files } = await parseFormPromise(req, form);

    req.body = { ...fields, ...files };

    next();
  } catch (error) {
    next(error);
  }
};

export default productParser;
