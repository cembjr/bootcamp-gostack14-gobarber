import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/providers/StorageProviders/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('IUsersRepository') private usersRepository: IUsersRepository,
    @inject('IStorageProvider') private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user)
      throw new AppError('Only authenticated users can change avatar.', 401);

    if (user.avatar) await this.storageProvider.deleteFile(user.avatar);

    const filename = await this.storageProvider.save(avatarFileName);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}
