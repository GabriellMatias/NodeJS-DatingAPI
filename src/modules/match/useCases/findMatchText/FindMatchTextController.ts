import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindMatchTextUseCase } from './FindMatchTextUseCase';

class FindMatchTextController {
    async handle(request: Request, response: Response): Promise<Response> {
      const { id } = request.query;
      const { fristMensagemId } = request.query;
      const { lastMessagemId } = request.query;


      const matchController = container.resolve(FindMatchTextUseCase);

      const result = await matchController.execute({
        id: id as string,
        fristMensagemId: fristMensagemId as string,
        lastMessagemId: lastMessagemId as string,
      });

      return response.json(result);
    }
}

export { FindMatchTextController };
