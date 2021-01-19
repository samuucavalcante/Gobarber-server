import { Request, Response } from 'express';

import { container } from 'tsyringe';

import SendForgotEmailPasswordService from '@modules/users/services/SendForgotEmailPasswordService';

export default class ForgotPassowrdController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body;

      const sendForgotEmailPassword = container.resolve(
        SendForgotEmailPasswordService,
      );
      console.log('asdsa');
      await sendForgotEmailPassword.execute({
        email,
      });

      return response.status(204).json();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
