import 'reflect-metadata';
import 'express-async-errors';
import '@shared/container';
import http from "http";
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { router } from './routes';
import { AppError } from '@shared/errors/AppError';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());

app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Routes
app.use(router);

app.get("/", (req, res) => {
  res.send("?");
})

app.use(
  (err: Error, request: express.Request, response: express.Response, _next: express.NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message} `,
    });
  }
);

const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

import "../../../modules/chat/socket";

export { serverHttp, io}; 