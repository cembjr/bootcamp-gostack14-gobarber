import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider';
import 'reflect-metadata';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailServ: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailServ = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password using the email', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'c@c.com.br',
      password: '123456',
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await sendForgotPasswordEmailServ.execute('c@c.com.br');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailServ.execute('c@c.com.br'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'c@c.com.br',
      password: '123456',
    });

    await sendForgotPasswordEmailServ.execute('c@c.com.br');

    expect(generateToken).toHaveBeenCalledWith(user?.id);
  });
});
