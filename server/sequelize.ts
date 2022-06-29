import { User } from './models/User';
import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
	database: 'e_commerce',
	dialect: 'mysql',
	username: process.env.MYSQL_LOGIN,
	password: process.env.MYSQL_PASS,
});

sequelize.addModels([User]);
