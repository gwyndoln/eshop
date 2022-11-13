import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import { sequelize } from './sequelize';
import authRouter from './routes/auth';
import createCommentRouter from './routes/createComment';
import createProductRouter from './routes/createProduct';
import errorHandler from './middleware/error-handler';
import notFound from './middleware/not-found';
import session from 'express-session';
import sessionOptions from './sessionOptions';
import isAuthenticated from './middleware/isAuthenticated';

const app = express();

const PORT = 5000 || process.env.PORT;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionOptions));
app.use((req, res, next) => {
	if (!req.session) {
		return next(new Error('redis не подключился'));
	}
	next();
});

app.use('/auth', authRouter);
app.use('/products', isAuthenticated, createCommentRouter);
app.use('/products', isAuthenticated, createProductRouter);
app.use(notFound);
app.use(errorHandler);

(async () => {
	try {
		await sequelize.sync(); //{ alter: true }
		app.listen(PORT, () => console.log(`Server is started on ${PORT} port`));
	} catch (error) {
		console.error(error);
	}
})();
