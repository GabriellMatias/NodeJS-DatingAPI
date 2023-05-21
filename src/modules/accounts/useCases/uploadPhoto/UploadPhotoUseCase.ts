import { MulterFile } from 'multer';
import UserModel, { IImage } from "@models/user";

interface IRequest {
  file: MulterFile;
  id: string;
}

export class UploadPhotoUseCase {
  async execute({ file, id }: IRequest): Promise<void> {
    const imageBuffer = file.buffer;
    const contentType = file.mimetype;

    const image = {
      name: file.originalname,
      data: imageBuffer,
      contentType: contentType,
    };

    await UserModel.findByIdAndUpdate(id, {
      $push: {
        photoProfile: image
      }
    });
  }
}

