import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

interface IUser {
  name: string;
  password?: string;
  email: string;
}

export default class UpdateAvatarController {
  public async update(response: Response, request: Request): Promise<Response> {
    try {
      const updateUserAvatarService = container.resolve(
        UpdateUserAvatarService,
      );

      const user: IUser = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ err: err.message });
    }
  }
}
