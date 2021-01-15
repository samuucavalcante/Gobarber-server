import AppError from '@shared/errors/AppError';
import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';
import FakesHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUsersService from './CreateUsersService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakesUsersRepository();
    const fakeHashProvider = new FakesHashProvider();
    const createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUsers = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUsers.execute({
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      password: 'secret',
    });

    const response = await authenticateUsers.execute({
      email: 'joedoe@example.com',
      password: 'secret',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakesUsersRepository();
    const fakeHashProvider = new FakesHashProvider();

    const authenticateUsers = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUsers.execute({
        email: 'joedoe@example.com',
        password: 'secret',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakesUsersRepository();
    const fakeHashProvider = new FakesHashProvider();
    const createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUsers = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUsers.execute({
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      password: 'secret',
    });

    expect(
      authenticateUsers.execute({
        email: 'joedoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
