import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ user_id: request.user.id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, old_password, password } = request.body;

    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute({
      name,
      email,
      password,
      old_password,
      user_id: request.user.id,
    });

    return response.json(user);
  }
}
