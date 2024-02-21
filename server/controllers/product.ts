import { Product } from '../models/Product';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProductForm } from '../types/types';
import getFileNames from '../functions/getFileNames';
import { Brand } from '../models/Brand';
import { Type } from '../models/Type';
import ApiError from '../error/api-error';
import { Comment } from '../models/Comment';

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, price, description, brand, type, image }: IProductForm =
      req.body;

    if (!title || !price || !description || !brand || !type || !image) {
      throw ApiError.BadRequest('У продукта должны быть заполнены все поля');
    }

    const code = Math.random().toString().slice(2, 11);

    const [brandModel] = await Brand.findOrCreate({
      where: { title: brand },
    });

    const [typeModel] = await Type.findOrCreate({
      where: { title: type },
    });

    const product = await Product.create({
      code,
      title,
      price,
      description,
      brandId: brandModel.id,
      typeId: typeModel.id,
      images: getFileNames(image),
    });

    const brandByKey = await product.$get('brand');
    const typeByKey = await product.$get('type');

    return res.status(StatusCodes.OK).json({ product, brandByKey, typeByKey });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productCode } = req.params;

    const product = await Product.findOne({ where: { code: productCode } });

    return res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.findAll();

    return res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    next(error);
  }
};

const editProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, price, description, brand, type }: IProductForm = req.body;
    const { productCode } = req.params;

    let product = await Product.findOne({ where: { code: productCode } });

    if (!product) {
      return next();
    }

    if (brand) {
      const [brandModel] = await Brand.findOrCreate({
        where: { title: brand },
      });

      brandModel.id !== product.brandId
        ? product.set({ brandId: brandModel.id })
        : false;
    }

    if (type) {
      const [typeModel] = await Type.findOrCreate({
        where: { title: type },
      });

      typeModel.id !== product.typeId
        ? product.set({ typeId: typeModel.id })
        : false;
    }

    if (title) {
      product.set({ title });
    }

    if (price) {
      product.set({ price });
    }

    if (description) {
      product.set({ description });
    }

    product = await product.save();

    return res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productCode } = req.params;
    const product = await Product.findOne({ where: { code: productCode } });

    if (!product) {
      return next();
    }

    product.images.map(async (image) => {});

    // const comments = await product.$get('comments');

    // if (comments) {
    //   (comments as Comment[]).forEach(async (comment: Comment) => {
    //     const subComments = await comment.$get('subComments');

    //     if (subComments) {
    //       subComments.forEach(async (comment: Comment) => {
    //         await comment.destroy();
    //       });
    //     }

    //     await comment.destroy();
    //   });
    // }

    // await product.destroy();

    return res.status(StatusCodes.OK).json({ msg: 'Succesfull deletion' });
  } catch (error) {
    next(error);
  }
};

const deleteProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Product.destroy({ where: {} });

    return res.status(StatusCodes.OK).json({ msg: 'Succesfull deletion' });
  } catch (error) {
    next(error);
  }
};

export {
  createProduct,
  getProduct,
  getProducts,
  editProduct,
  deleteProduct,
  deleteProducts,
};
