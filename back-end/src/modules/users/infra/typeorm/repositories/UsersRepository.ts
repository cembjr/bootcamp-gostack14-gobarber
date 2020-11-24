import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private _repository: Repository<User>;

  constructor() {
    this._repository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this._repository.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this._repository.findOne({
      where: { email },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User | undefined> {
    const user = this._repository.create(userData);

    await this._repository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return await this._repository.save(user);
  }
}
