import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindMatchUseCase } from './FindMatchUseCase';

class FindMatchController {
    async handle(request: Request, response: Response): Promise<Response> {
      const { id } = request.query;

      const matchController = container.resolve(FindMatchUseCase);

      const result = await matchController.execute({id: id as string,});

      return response.json(result);
    }
}

export { FindMatchController };
