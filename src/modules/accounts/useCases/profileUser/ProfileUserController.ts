import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {
   async handle(request: Request, response: Response): Promise<Response> {
      const { email } = request.query;

      const profileUserUseCase = container.resolve(ProfileUserUseCase);

      const result = await profileUserUseCase.execute({email: email as string,});

      return response.json(result);
   }
}

export { ProfileUserController }