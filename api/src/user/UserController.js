import '../dotenv.js';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { UserFactory } from './User.js';
import { UserRepository } from './UserRepository.js';
import { privateRoute } from '../middlewares.js';

const UserController = Router();

UserController.get('/user', [privateRoute()], async (req, res, next) => {
  try {
    const user = await UserRepository.getById(req.userId);
    delete user.password;
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

UserController.post('/users', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userFactory = new UserFactory();
    const user = await userFactory.create(name, email, password);

    await UserRepository.save(user);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

UserController.post('/users/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserRepository.getByEmail(email);
    await user.comparePassword(password);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '60m' });

    res.json({ userId: user.id, token });
  } catch (error) {
    next(error);
  }
});

export { UserController };
