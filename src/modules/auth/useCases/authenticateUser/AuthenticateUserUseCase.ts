import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserModel from '../../../../models/user'
import auth from '@config/auth';
import { ObjectId } from 'mongoose';
interface IRequest {
  cellphone: string;
}

interface MinAndMaxPreference {
  min: number;
  max: number;
}

interface IResponse {
  _id: string;
  email: string;
  cellphone: string;
  dateBirth: string;
  age: number;
  name: string;
  description: string;
  photoProfile: [string],
  location: Object;
  sex: string;
  sexPreference: string;
  settings: {
    agePreference: MinAndMaxPreference;
    distancePreference: MinAndMaxPreference;
  };
}

class AuthenticateUserUseCase {
   async execute({ cellphone }: IRequest): Promise<IResponse> {
    console.log(cellphone);

      const user = await UserModel.findOne({ cellphone });

      if (!user) throw new AppError("user doesn't exist", 404);

      const resultUser: IResponse = {
        _id: user.id,
        name: user.name,
        description: user.description,
        email: user.email,
        cellphone: user.cellphone,
        dateBirth: user.dateBirth,
        age: user.age,
        photoProfile: user.photoProfile,
        location: user.location,
        sex: user.sex,
        sexPreference: user.sexPreference,
        settings: {
          agePreference: user.settings.agePreference,
          distancePreference: user.settings.distancePreference,
        },
      }
      return resultUser;
   }
}

export { AuthenticateUserUseCase };
