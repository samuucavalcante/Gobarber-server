import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakesUsersTokenRepository';
import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';
import ResetPasswordService from './ResetPasswordService';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakesUsersRepository;
let fakeUsersTokenRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;
describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakesUsersRepository();
    fakeUsersTokenRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokenRepository,
      fakeHashProvider,
    );
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'joedoe@example.com',
      name: 'Joe Doe',
      password: '12345',
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updateUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updateUser?.password).toBe('123123');
  });

  it('should not be able to reset password with non-existing token', async () => {
    expect(
      resetPasswordService.execute({
        password: '12345',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with non-existing user', async () => {
    const { token } = await fakeUsersTokenRepository.generate(
      'non-existing-user',
    );

    expect(
      resetPasswordService.execute({
        password: '12345',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
