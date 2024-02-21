import { Request, Response, NextFunction } from 'express';
//import {promisify} from 'util'
import { access, mkdir } from 'node:fs/promises';
import formidable from 'formidable';
import ApiError from '../error/api-error';
import checkFileType from '../functions/checkFileType';
import { typeUploadDir as uploadDir } from '../variables/variables';
import parseFormPromise from '../functions/parseFormPromise';

const typeParser = async (req: Request, res: Response, next: NextFunction) => {
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
      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const imageRegExp = /\.(jpeg|jpg|png|webp)$/;

      if (part.name === 'title') {
        return form._handlePart(part);
      }

      const isFileCorrect = checkFileType(part, imageRegExp, allowedImageTypes);

      if (!isFileCorrect) {
        throw ApiError.UnsuportedMedia('Неправильный тип данных');
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

export default typeParser;
