import { Product } from './../models/Product';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ICreateProductForm } from '../types/types';
import getFilesUri from '../functions/getFilesUri';
import { Brand } from '../models/Brand';
import { Type } from '../models/Type';

const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let { title, price, description, brand, type, image }: ICreateProductForm =
			req.body;

		const code = Math.random().toString().slice(2, 11);
		brand = brand.trim().toLowerCase();
		type = type.trim().toLowerCase();

		const [brandModel, brandCreated] = await Brand.findOrCreate({
			where: { title: brand },
		});
		const [typeModel, typeCreated] = await Type.findOrCreate({
			where: { title: type },
		});

		const product = await Product.create({
			code,
			title,
			price,
			description,
			brandId: brandModel.id,
			typeId: typeModel.id,
			images: getFilesUri(image),
		});

		const brandByKey = await product.$get('brand');
		const typeByKey = await product.$get('type');

		return res.status(StatusCodes.OK).json({ product, brandByKey, typeByKey });
	} catch (error) {
		next(error);
	}
};

export { createProduct };
