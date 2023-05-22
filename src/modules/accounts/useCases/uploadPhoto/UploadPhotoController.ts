import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadPhotoUseCase } from './UploadPhotoUseCase';


class UploadImageUrlUserController {
    async handle(request: Request, response: Response): Promise<Response> {

      const uploadImageUrlUserController = container.resolve(UploadPhotoUseCase);

      const result = await uploadImageUrlUserController.execute(request.body);

      return response.json(result);
    }
}

export { UploadImageUrlUserController };
