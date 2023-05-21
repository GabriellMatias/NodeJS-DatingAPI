import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindUsersUseCase } from './FindUsersUseCase';

class FindUsersController {
    async handle(request: Request, response: Response): Promise<Response> {

      const findUsersController = container.resolve(FindUsersUseCase);

      const createUserUseCase = await findUsersController.execute(request.body);

      return response.json(createUserUseCase);
    }
}

export { FindUsersController };
