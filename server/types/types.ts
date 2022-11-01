declare module 'express-session' {
	export interface SessionData {
		user?: { id: string } | null;
	}
}

interface userClaims {
	email: string;
	password: string;
}

interface JwtPayload {
	id?: string;
}

export { userClaims, JwtPayload };
