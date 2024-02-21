import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import sequelize from './sequelize';
import router from './routes';
import errorHandler from './middleware/error-handler';
import notFound from './middleware/not-found';
import session from 'express-session';
import sessionOptions from './sessionOptions';

const app = express();

const PORT = 5000 || process.env.PORT;

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('files'));

// app.use(session(sessionOptions));
// app.use((req, res, next) => {
// 	if (!req.session) {
// 		return next(new Error('redis не подключился'));
// 	}
// 	next();
// });

app.use('/api/v1', router);
app.use(notFound);
app.use(errorHandler);

(async () => {
	try {
		async () => {
			await sequelize.sync(); //{ alter: true }
		};
		app.listen(PORT, () => console.log(`Server is started on ${PORT} port`));
	} catch (error) {
		console.error(error);
	}
})();
