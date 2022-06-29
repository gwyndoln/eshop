import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import ApiError from '../error/api-error';
import { User } from '../models/User';

const showLogin = async (req: Request, res: Response, next: NextFunction) => {
	return res.status(StatusCodes.ACCEPTED).json({ msg: 'ok' });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user) {
			return next(ApiError.OK('Неверный email'));
		}

		const hash = user.password;
		const match = await bcrypt.compare(password, hash);

		if (!match) {
			return next(ApiError.OK('Неверный пароль'));
		}

		const accessToken = jwt.sign(
			{ email },
			process.env.ACCESS_TOKEN_SECRET as string,
			{
				expiresIn: '30d',
			}
		);

		return res.status(StatusCodes.OK).json({ accessToken });
	} catch (error) {
		next(error);
	}
};

const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;

		const saltRounds = 10;
		const hash = await bcrypt.hash(password, saltRounds);

		const user = await User.create({
			email,
			password: hash,
		});

		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL_LOGIN,
				pass: process.env.EMAIL_PASS,
			},
		});

		jwt.sign(
			{ userId: user.userId },
			process.env.EMAIL_TOKEN_SECRET as string,
			{
				expiresIn: '30d',
			},
			(err, emailToken) => {
				const url = `http://localhost:3000/auth/confirmation/${emailToken}`;

				transporter.sendMail({
					from: process.env.EMAIL_LOGIN,
					to: email,
					subject: 'Confirmation message',
					html: `<a href="${url}">Подтвердите свой email</a>`,
				});

				if (err) {
					throw err;
				}

				return res.status(StatusCodes.CREATED).json({ user });
			}
		);
	} catch (error) {
		next(error);
	}
};

const confirmation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		interface JwtPayload {
			userId: string;
		}

		const { userId } = jwt.verify(
			req.params.emailToken,
			process.env.EMAIL_TOKEN_SECRET as string
		) as JwtPayload;

		await User.update({ confirmed: true }, { where: { userId } });

		return res.redirect('http://localhost:3000/auth/login');
	} catch (error) {
		next(error);
	}
};

export { register, confirmation, login, showLogin };
