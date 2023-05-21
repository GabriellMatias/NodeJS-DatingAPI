import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {

      const createUserController = container.resolve(CreateUserUseCase);

      const createUserUseCase = await createUserController.execute(request.body);

      return response.json(createUserUseCase);
    }
}

export { CreateUserController };
