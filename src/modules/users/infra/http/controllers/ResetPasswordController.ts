import { Request, Response } from 'express';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { password, token } = request.body;

      const resetPassword = container.resolve(ResetPasswordService);

      resetPassword.execute({
        token,
        password,
      });

      return response.status(204).json();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
