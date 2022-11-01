import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';

let RedisStore = connectRedis(session);

let redisClient = new Redis();

const sessionOptions = {
	store: new RedisStore({ client: redisClient }),
	secret: process.env.SESSION_SECRET as string,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		//secure: true,
		maxAge: 30 * 24 * 60 * 60 * 1000,
		sameSite: 'strict' as 'strict',
	},
};

export default sessionOptions;
