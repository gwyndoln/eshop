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

export const sequelize = new Sequelize({
	database: 'e_commerce',
	dialect: 'mysql',
	username: process.env.MYSQL_LOGIN,
	password: process.env.MYSQL_PASS,
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
