import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { errorHandler, notFound } from "./middlewares/error.middleware";

function createServer() {
  const app = express();

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get("/health", (req, res) => {
    res.send("Server is running!");
  });

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

export default createServer;
