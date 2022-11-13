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

type IUserComment = Pick<Comment, 'text' | 'userId'> & {
	video: formidable.File | formidable.File[];
	image: formidable.File | formidable.File[];
};

type ICreateProductForm = Pick<Product, 'title' | 'price' | 'description'> & {
	brand: string;
	type: string;
	image: formidable.File | formidable.File[];
};

export { JwtPayload, IUserClaims, IUserComment, ICreateProductForm };
