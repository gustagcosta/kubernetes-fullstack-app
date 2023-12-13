import './dotenv.js';
import express from 'express';
import cors from 'cors';
import { UserController } from './user/UserController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ ok: 'cool' });
});

app.use(UserController);

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const errorResponse = {
    message: err.message,
    stack: err.stack,
  };

  if (process.env.NODE_ENV === 'production') {
    delete errorResponse.stack;
  }

  res.status(statusCode).json(errorResponse);
};

app.use(notFound);
app.use(errorHandler);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
