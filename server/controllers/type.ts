import { StatusCodes } from 'http-status-codes';
import { Type } from './../models/Type';
import { Request, Response, NextFunction } from 'express';
import { unlink } from 'node:fs/promises';
import { typeUploadDir as uploadDir } from '../variables/variables';

const createType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, image } = req.body;

    const type = await Type.create(
      { title, image: image.newFilename },
      { fields: ['uuid', 'title', 'image'] }
    );

    return res.status(StatusCodes.OK).json({ type, url: type.url });
  } catch (error) {
    next(error);
  }
};

const editType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, title, image } = req.body;
    console.log(image);
    let type = await Type.findOne({ where: { uuid: id } });

    if (!type) {
      return next();
    }

    if (title) {
      type.set({ title });
    }

    if (image) {
      await unlink(`${uploadDir}/${type.image}`);

      type.set({ image: image.fileName });
    }

    type = await type.save();

    return res.status(StatusCodes.OK).json({ type });
  } catch (error) {
    next(error);
  }
};

const deleteType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;

    const type = await Type.findOne({ where: { uuid: id } });

    if (!type) {
      return next();
    }

    await unlink(`${uploadDir}/${type.image}`);

    await type.destroy();
  } catch (error) {
    next(error);
  }
};

export { createType, deleteType, editType };
