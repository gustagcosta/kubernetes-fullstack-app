import bcrypt from 'bcrypt';

export class User {
  constructor(name, email, password, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  async comparePassword(hash) {
    try {
      const valid = await bcrypt.compare(hash, this.password);

      if (!valid) {
        throw new Error('password not match');
      }
    } catch (error) {
      throw error;
    }
  }
}

export class UserFactory {
  validate(name, email, password) {
    if (typeof name != 'string' || name.length < 3) {
      throw new Error('invalid name');
    }

    if (typeof email != 'string' || email.length < 3 || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw new Error('invalid email');
    }

    if (typeof password != 'string' || password.length < 6) {
      throw new Error('invalid password');
    }
  }

  async create(name, email, password) {
    this.validate(name, email, password);

    const cryptedPassword = await this.cryptPassword(password);

    return new User(name, email, cryptedPassword);
  }

  async cryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
