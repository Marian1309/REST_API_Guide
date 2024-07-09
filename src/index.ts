import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import { DATABASE_URL, PORT } from './constants';

const app = express();

app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(DATABASE_URL);
mongoose.connection.on('error', (err: Error) => {
  console.log(err);
});
