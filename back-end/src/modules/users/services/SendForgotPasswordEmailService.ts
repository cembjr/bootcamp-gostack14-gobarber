import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('IUsersRepository') private usersRepository: IUsersRepository,
    @inject('IUserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('IMailProvider') private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exists');

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotpasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotpasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
    return {} as User;
  }
}
