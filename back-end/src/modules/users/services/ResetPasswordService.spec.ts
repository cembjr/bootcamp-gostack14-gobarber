import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: IHashProvider;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'c@c.com.br',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user?.id || '');

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const newPassword = '123123';
    await resetPasswordService.execute(token, newPassword);

    const updatedUser = await fakeUserRepository.findById(user?.id || '');

    expect(updatedUser?.password).toBe(newPassword);
    expect(generateHash).toHaveBeenCalledWith(newPassword);
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute('non-existing-token', '123456'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user-id',
    );

    await expect(
      resetPasswordService.execute(token, '123456'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'c@c.com.br',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user?.id || '');

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute(token, '123456'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
