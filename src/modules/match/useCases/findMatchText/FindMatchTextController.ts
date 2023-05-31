import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindMatchTextUseCase } from './FindMatchTextUseCase';

class FindMatchTextController {
    async handle(request: Request, response: Response): Promise<Response> {
      const { id } = request.query;
      const { minMensagem } = request.query;
      const { maxMensagem } = request.query;


      const matchController = container.resolve(FindMatchTextUseCase);

      const result = await matchController.execute({
        id: id as string,
        minMensagem: minMensagem as string,
        maxMensagem: maxMensagem as string,
      });

      return response.json(result);
    }
}

export { FindMatchTextController };
