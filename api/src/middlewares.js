import './dotenv.js';
import jwt from 'jsonwebtoken';

export const privateRoute = () => {
  return async (request, response, next) => {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
      return response.status(401).json('token not provided');
    }

    const [, token] = authHeaders.split(' ');

    try {
      jwt.verify(token, process.env.JWT_SECRET);

      const sub = jwt.decode(token);
      
      request.userId = sub.userId;

      return next();
    } catch (err) {
      console.log(err);
      return response.status(401).end();
    }
  };
};
