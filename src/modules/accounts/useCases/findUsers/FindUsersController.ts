import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindUsersUseCase } from './FindUsersUseCase';

class FindUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
      const { latitude, longitude, id } = request.query;

      const findUsersController = container.resolve(FindUsersUseCase);

      const createUserUseCase = await findUsersController.execute({id: id as string, latitude: latitude as string , longitude: longitude as string ,});

      return response.json(createUserUseCase);
    }
}

export { FindUsersController };
