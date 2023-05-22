import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { OTPUserUseCase } from './OTPUserUseCase';

class OTPUserController {
    async handle(request: Request, response: Response): Promise<Response> {
      const { cellphone } = request.query;

      const oTPUserController = container.resolve(OTPUserUseCase);

      const otp = await oTPUserController.execute({cellphone: cellphone as string,});

      return response.json(otp);
    }
}

export { OTPUserController };
