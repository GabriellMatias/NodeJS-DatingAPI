import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserModel from '../../../../models/user'
import auth from '@config/auth';
import { ObjectId } from 'mongoose';
interface IRequest {
   email: string;
   password: string;
}

interface IResponse {
   result: {
      id: any;
      name: string;
      email: string;
   };
   token: string;
}

class AuthenticateUserUseCase {
   async execute({ email, password }: IRequest): Promise<IResponse> {

      const user = await UserModel.findOne({ email });
      const {
         expires_in_token,
         secret_token,
      } = auth;

      if (!user) throw new AppError("user doesn't exist", 404);

      const isPasswordCorrect = await compare(password, user.password);
      if (!isPasswordCorrect) throw new AppError("invalid credentials", 400);

      const token = sign({}, secret_token, { expiresIn: expires_in_token });

      const tokenAndUserReturn: IResponse = {
         token: token,
         result: { name: user.name, email: user.email, id: user._id }
      }

      return tokenAndUserReturn
   }
}

export { AuthenticateUserUseCase };
