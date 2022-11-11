import { User } from './../models/User';
import { Comment } from './../models/Comment';
import formidable from 'formidable';

declare module 'express-session' {
	export interface SessionData {
		user?: { id: string } | null;
	}
}

type IUserClaims = Pick<User, 'email' | 'password'>;

type IUserComment = Pick<Comment, 'text' | 'userId'> & {
	video: formidable.File | formidable.File[];
	image: formidable.File | formidable.File[];
};

interface JwtPayload {
	id?: string;
}

export { IUserClaims, IUserComment, JwtPayload };
