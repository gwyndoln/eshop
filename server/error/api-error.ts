import { StatusCodes } from 'http-status-codes';

class ApiError extends Error {
	statusCode: StatusCodes;

	constructor(statusCode: StatusCodes, message: string) {
		super(message);
		this.statusCode = statusCode;
	}

	static UnsuportedMedia(message: string) {
		throw new ApiError(StatusCodes.UNSUPPORTED_MEDIA_TYPE, message);
	}

	static BadRequest(message: string) {
		throw new ApiError(StatusCodes.BAD_REQUEST, message);
	}

	static Unauthorized(message: string) {
		throw new ApiError(StatusCodes.UNAUTHORIZED, message);
	}

	static OK(message: string) {
		throw new ApiError(StatusCodes.OK, message);
	}

	static notFound(message: string) {
		throw new ApiError(StatusCodes.NOT_FOUND, message);
	}

	static Forbidden(message: string) {
		throw new ApiError(StatusCodes.FORBIDDEN, message);
	}
}

export default ApiError;
