import { ProductDeliveryLocation } from './models/ProductDeliveryLocation';
import { DeliveryLocation } from './models/DeliveryLocation';
import { Brand } from './models/Brand';
import { Type } from './models/Type';
import { Rating } from './models/Rating';
import { Order } from './models/Order';
import { Product } from './models/Product';
import { Comment } from './models/Comment';
import { User } from './models/User';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
	port: Number(process.env.DB_PORT) || 3306,
	host: process.env.DB_HOST || 'localhost',
	database: process.env.DB_NAME,
	dialect: 'mysql',
	username: process.env.DB_LOGIN || 'root',
	password: process.env.DB_PASS || '',
	models: [
		User,
		Comment,
		Product,
		Order,
		Rating,
		Type,
		Brand,
		DeliveryLocation,
		ProductDeliveryLocation,
	],
});

export default sequelize;
