import AppError from '@shared/errors/AppError';
import FakesMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakesUsersTokenRepository';
import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';
import SendForgotPasswordEmailService from './SendForgotEmailPasswordService';

let fakeUsersRepository: FakesUsersRepository;
let fakeUsersTokenRepository: FakeUserTokensRepository;
let fakesMailProvider: FakesMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakesUsersRepository();
    fakesMailProvider = new FakesMailProvider();
    fakeUsersTokenRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakesMailProvider,
      fakeUsersTokenRepository,
    );
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakesMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      email: 'joedoe@example.com',
      name: 'Joe Doe',
      password: '12345',
    });

    await sendForgotPasswordEmail.execute({
      email: 'joedoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('shoud not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generatedToken = jest.spyOn(fakeUsersTokenRepository, 'generate');
    const user = await fakeUsersRepository.create({
      email: 'joedoe@example.com',
      name: 'Joe Doe',
      password: '12345',
    });

    await sendForgotPasswordEmail.execute({
      email: 'joedoe@example.com',
    });

    expect(generatedToken).toHaveBeenCalledWith(user.id);
  });
});
