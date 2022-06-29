import 'dotenv/config';
import express from 'express';
import { sequelize } from './sequelize';
import authRouter from './routes/auth';
import helmet from 'helmet';
import errorHandler from './middleware/error-handler';
import notFound from './middleware/not-found';

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(helmet());
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRouter);
app.use(notFound);
app.use(errorHandler);

(async () => {
	try {
		//await sequelize.authenticate();
		await sequelize.sync({ alter: true });
		app.listen(PORT, () => console.log(`Server is started on ${PORT} port`));
	} catch (error) {
		console.log(error);
	}
})();
