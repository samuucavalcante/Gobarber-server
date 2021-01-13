import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

interface IUser {
  name: string;
  password?: string;
  email: string;
}

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const usersRepository = new UsersRepository();
      const authenticateUser = new AuthenticateUserService(usersRepository);

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });
      const userD: IUser = user;

      delete userD.password;

      return response.json({ user, token });
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}
