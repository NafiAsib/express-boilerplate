import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new AppError(`Not found: ${req.originalUrl}`, 404);
	next(error);
};

const errorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const statusCode = error.statusCode || 500;
	const message = error.message || "Internal server error";

	if (
		process.env.NODE_ENV === "development" ||
		process.env.NODE_ENV === "test"
	) {
		res.status(statusCode).json({
			message: error.message,
			stack: error.stack,
			error: error,
		});
	} else if (process.env.NODE_ENV === "production") {
		if (error.name === "CastError") {
			const message = `Resource not found. Invalid value ${error.value} for ${error.path}`;
			error = new AppError(message, 400);
		} else if (error.code === 11000) {
			const message = `Duplicate field value: ${Object.keys(
				error.keyValue,
			)} already exists`;
			error = new AppError(message, 400);
		} else if (error.name === "ValidationError") {
			const message = Object.values(error.errors)
				.map((value: any) => value.message)
				.join(", ");
			error = new AppError(message, 400);
		}
		if (error.isOperational) {
			res.status(statusCode).json({
				status: statusCode,
				message: error.message,
			});
		} else {
			res.status(500).json({
				status: statusCode,
				message: "Something went wrong",
			});
		}
	}
};

export { notFound, errorHandler };
