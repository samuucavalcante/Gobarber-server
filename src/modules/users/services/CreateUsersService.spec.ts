import AppError from '@shared/errors/AppError';
import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakesHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakesUsersRepository();
    const fakesHashProvider = new FakesHashProvider();
    const createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakesHashProvider,
    );

    const user = await createUsers.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakesUsersRepository();
    const fakesHashProvider = new FakesHashProvider();
    const createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakesHashProvider,
    );

    await createUsers.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    });

    expect(
      createUsers.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
