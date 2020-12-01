import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('IUsersRepository') private usersRepository: IUsersRepository,
    @inject('IUserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('IHashProvider') private hashProvider: IHashProvider,
  ) {}

  async execute(token: string, password: string): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) throw new AppError('User token does not exists');

    const user = await this.usersRepository.findById(userToken?.user_id);

    if (!user) throw new AppError('User does not exists');

    const tokenCreatedAt = userToken.create_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expired.');

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}
