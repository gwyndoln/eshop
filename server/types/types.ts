import { User } from './../models/User';
import { Comment } from './../models/Comment';
import formidable from 'formidable';
import { Product } from '../models/Product';

declare module 'express-session' {
	export interface SessionData {
		user?: { id: string } | null;
	}
}

interface JwtPayload {
	id?: string;
}

type IUserClaims = Pick<User, 'email' | 'password'>;

type ICommentForm = Pick<Comment, 'text'> & {
	userId: string;
	video: formidable.File | formidable.File[];
	image: formidable.File | formidable.File[];
};

type ICommentFields = [
	Pick<Comment, 'text' | 'productId'> & {
		userId: string;
		videos?: string[];
		images?: string[];
	},
	{ fields: string[] }
];

type IProductForm = Pick<Product, 'title' | 'description'> & {
	price: string;
	brand: string;
	type: string;
	image: formidable.File | formidable.File[];
};

export { JwtPayload, IUserClaims, ICommentForm, ICommentFields, IProductForm };
