import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import ApiError from '../error/api-error';
import { User } from '../models/User';
import { JwtPayload, userClaims } from '../types/types';

const showLogin = async (req: Request, res: Response, next: NextFunction) => {
	return res.status(StatusCodes.ACCEPTED).json({ msg: 'ok' });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password }: userClaims = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user) {
			return next(ApiError.Forbidden('Неверный email'));
		}

		const hash = user.password;
		const isMatch = await bcrypt.compare(password, hash);

		if (!isMatch) {
			return next(ApiError.Forbidden('Неверный пароль'));
		}

		if (!user.confirmed) {
			return next(ApiError.Forbidden('Почта не подтверждена'));
		}

		req.session.regenerate((err) => {
			if (err) {
				throw err;
			}

			req.session.user = { id: user.uuid };

			req.session.save((err) => {
				if (err) {
					throw err;
				}
				//res.redirect('/')
				return res
					.status(StatusCodes.MOVED_TEMPORARILY)
					.json({ user, session: req.session.user });
			});
		});
	} catch (err) {
		next(err);
	}
};

const logout = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session.user) {
		return res
			.status(StatusCodes.OK)
			.json({ msg: 'Пользователь не залогинен' });
	}

	req.session.user = null;

	req.session.save((err) => {
		if (err) {
			next(err);
		}

		req.session.regenerate((err) => {
			if (err) {
				next(err);
			}

			return res
				.status(StatusCodes.MOVED_TEMPORARILY)
				.json({ msg: 'Успешный логаут' }); //.redirect('/')
		});
	});
};

const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password }: userClaims = req.body;

		const saltRounds: number = 10;
		const hash = await bcrypt.hash(password, saltRounds);

		const user = await User.create(
			{
				email,
				password: hash,
			},
			{ fields: ['email', 'password', 'uuid'] }
		);

		// sending a message to email

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
			{ id: user.uuid },
			process.env.EMAIL_TOKEN_SECRET as string,
			{
				expiresIn: '30s',
			},
			(err, emailToken) => {
				const url = `http://localhost:5000/auth/confirmation/${emailToken}`;

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
	} catch (err) {
		next(err);
	}
};

const confirmation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = jwt.verify(
			req.params.emailToken,
			process.env.EMAIL_TOKEN_SECRET as string
		) as JwtPayload;

		await User.update({ confirmed: true }, { where: { uuid: id } });

		return res.redirect('/');
	} catch (err) {
		next(err);
	}
};

export { register, confirmation, login, logout, showLogin };
