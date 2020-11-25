import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
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

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
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

    expect(
      createUserServ.execute({
        name: 'Jhon Doe',
        email: 'c@c.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
