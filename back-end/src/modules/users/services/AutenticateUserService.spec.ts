import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AutenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserServ: CreateUserService;
let authenticateUserServ: AuthenticateUserService;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    fakeHashProvider = new FakeHashProvider();

    createUserServ = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    authenticateUserServ = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUserServ.execute({
      name: 'Jhon Doe',
      email: 'c@c.com.br',
      password: '123456',
    });

    const response = await authenticateUserServ.execute({
      email: 'c@c.com.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserServ.execute({
        email: 'c@c.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUserServ.execute({
      name: 'Jhon Doe',
      email: 'c@c.com.br',
      password: '123456',
    });

    await expect(
      authenticateUserServ.execute({
        email: 'c@c.com.br',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
