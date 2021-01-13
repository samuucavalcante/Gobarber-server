import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateUsersService from '@modules/users/services/CreateUsersService';

interface IUser {
  name: string;
  password?: string;
  email: string;
}

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      const createUser = container.resolve(CreateUsersService);

      const user: IUser = await createUser.execute({
        name,
        email,
        password,
      });
      delete user.password;
      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
