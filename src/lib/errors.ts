import { StatusCodes } from "http-status-codes";

class CustomError extends Error {
	public status: string = "error";
	public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;

	constructor(message: string) {
		super(message);
	}

	badRequest = () => {
		this.statusCode = StatusCodes.BAD_REQUEST;
		return this;
	};

	notFound = () => {
		this.statusCode = StatusCodes.NOT_FOUND;
		return this;
	};

	serverFailure = () => {
		return this;
	};

	unAuthorized = () => {
		this.statusCode = StatusCodes.UNAUTHORIZED;
		return this;
	};
}

export const badRequestError = (msg: string) =>
	new CustomError(msg).badRequest();

export const internalServerError = (msg: string) =>
	new CustomError(msg).serverFailure();

export const unAuthorizedError = (msg: string) =>
	new CustomError(msg).unAuthorized();

export const notFoundError = (msg: string) => new CustomError(msg).notFound();
