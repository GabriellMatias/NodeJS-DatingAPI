import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {
   async handle(request: Request, response: Response): Promise<Response> {
      const { id } = request.query;

      const profileUserUseCase = container.resolve(ProfileUserUseCase);

      const result = await profileUserUseCase.execute({id: id as string,});

      return response.json(result);
   }
}

export { ProfileUserController }