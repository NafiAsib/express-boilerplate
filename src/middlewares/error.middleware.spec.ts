import { Request, Response, NextFunction } from "express";
import { notFound, errorHandler } from "./error.middleware";
import AppError from "../utils/AppError";
import assert from "assert";
import { describe, it } from "node:test";

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
