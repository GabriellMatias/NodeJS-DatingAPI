import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
   async handle(request: Request, response: Response): Promise<Response> {
      const { cellphone } = request.body;

      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

      const authenticateInfo = await authenticateUserUseCase.execute({
        cellphone,
      });

      return response.json(authenticateInfo);
   }
}

export { AuthenticateUserController };
