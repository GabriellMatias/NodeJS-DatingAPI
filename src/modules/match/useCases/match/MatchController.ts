import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { MatchUseCase } from './MatchUseCase';

class MatchController {
    async handle(request: Request, response: Response): Promise<Response> {

      const matchController = container.resolve(MatchUseCase);

      const result = await matchController.execute(request.body);

      return response.json(result);
    }
}

export { MatchController };
