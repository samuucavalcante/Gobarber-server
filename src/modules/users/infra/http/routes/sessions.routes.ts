import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const authenticateUser = new AuthenticateUserService(usersRepository);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user, token });
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
