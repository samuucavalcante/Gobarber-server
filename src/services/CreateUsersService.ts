import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUsersService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUsersExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUsersExists) {
      throw new AppError('Email adress already used.');
    }
    const hashedPassowrd = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassowrd,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUsersService;
