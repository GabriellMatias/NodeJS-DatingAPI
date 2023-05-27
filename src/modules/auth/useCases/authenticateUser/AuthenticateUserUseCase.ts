import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserModel from '../../../../models/user'
import auth from '@config/auth';
import { ObjectId } from 'mongoose';
interface IRequest {
  cellphone: string;
}

interface IResponse {
  id: string;
}

class AuthenticateUserUseCase {
   async execute({ cellphone }: IRequest): Promise<IResponse> {
    console.log(cellphone);

      const user = await UserModel.findOne({ cellphone });

      if (!user) throw new AppError("user doesn't exist", 404);

      const userR: IResponse = {
        id: user._id.toString(),
      }

      return userR
   }
}

export { AuthenticateUserUseCase };
