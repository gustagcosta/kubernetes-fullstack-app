import { UserModel } from '../database.js';
import { User } from './User.js';

export class UserRepository {
  static async save(user) {
    try {
      const userExists = await UserModel.find({ email: user.email });
      if (userExists.length > 0) {
        throw new Error('email already registred');
      }
      const userModel = await UserModel.create({ name: user.name, email: user.email, password: user.password });
      return userModel;
    } catch (error) {
      if (error.message == 'email already registred') {
        throw error;
      }

      console.log(error);
      throw new Error('error while save user');
    }
  }

  static async getByEmail(email) {
    try {
      const userFromDb = await UserModel.findOne({ email });
      if (!userFromDb) {
        throw new Error('user not found');
      }

      return new User(userFromDb.name, userFromDb.email, userFromDb.password, userFromDb.id);
    } catch (error) {
      if (error.message == 'user not found') {
        throw error;
      }

      console.log(error);
      throw new Error('error while get user');
    }
  }

  static async getById(id) {
    try {
      const userFromDb = await UserModel.findById(id);
      if (!userFromDb) {
        throw new Error('user not found');
      }

      return new User(userFromDb.name, userFromDb.email, userFromDb.password, userFromDb.id);
    } catch (error) {
      if (error.message == 'user not found') {
        throw error;
      }

      console.log(error);
      throw new Error('error while get user');
    }
  }
}
