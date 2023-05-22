import { MulterFile } from 'multer';
import UserModel from "@models/user";

interface IRequest {
  imageUrl: string;
  id: string;
}

export class UploadPhotoUseCase {
  async execute({ imageUrl, id }: IRequest): Promise<void> {

    await UserModel.findByIdAndUpdate(id, {
      $push: {
        photoProfile: imageUrl
      }
    });
  }
}

