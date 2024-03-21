import assert from "node:assert";
import { describe, it } from "node:test";
import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { errorHandler, notFound } from "./error.middleware";

describe("notFound middleware", () => {
	it("should call next function with an error when route is not found", () => {
		const req = {} as Request;
		const res = {} as Response;
		const next = () => {};

		notFound(req, res, (error: any) => {
			assert(error instanceof AppError);
			assert.strictEqual(error.statusCode, 404);
			assert.strictEqual(error.message, "Not found: undefined");
		});
	});
});
