import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUsersExists = await this.userRepository.findByEmail(email);

    if (checkUsersExists) {
      throw new AppError('Email adress already used.');
    }
    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUsersService;
