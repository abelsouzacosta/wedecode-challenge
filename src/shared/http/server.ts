import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import cors from 'cors';
import '@shared/typeorm';
import express, { NextFunction, Request, Response } from 'express';
import ApplicationError from '@shared/errors/ApplicationError';
import { router } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

// middleware usado par o tratametno de erros assíncronos
app.use(
  // eslint-disable-next-line
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ApplicationError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        stack: error.stack,
      });
    }

    return response.status(400).json({
      status: 'error',
      message: error.message,
      stack: error.stack,
    });
  },
);

app.listen(process.env.PORT);
