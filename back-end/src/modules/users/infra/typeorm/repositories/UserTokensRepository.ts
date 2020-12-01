import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

export default class UserTokensRepository implements IUserTokensRepository {
  private _repository: Repository<UserToken>;

  constructor() {
    this._repository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this._repository.create({
      user_id,
    });

    await this._repository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this._repository.findOne({
      where: { token },
    });

    return userToken;
  }
}
