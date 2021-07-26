import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import cors from 'cors';
import '@shared/typeorm';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT);
