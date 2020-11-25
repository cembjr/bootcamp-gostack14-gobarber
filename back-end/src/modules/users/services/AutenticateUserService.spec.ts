import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AutenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserServ = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserServ.execute({
      name: 'Jhon Doe',
      email: 'c@c.com.br',
      password: '123456',
    });

    const authenticateUserServ = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const response = await authenticateUserServ.execute({
      email: 'c@c.com.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserServ = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUserServ.execute({
        email: 'c@c.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserServ = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    await createUserServ.execute({
      name: 'Jhon Doe',
      email: 'c@c.com.br',
      password: '123456',
    });

    const authenticateUserServ = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUserServ.execute({
        email: 'c@c.com.br',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
