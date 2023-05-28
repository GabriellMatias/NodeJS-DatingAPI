import UserModal from '@models/user';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

interface MinAndMaxPreference {
  min: number;
  max: number;
}

interface IResponse {
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

interface IRequest {
  id: string,
}

@injectable()
class ProfileUserUseCase {

  constructor(
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
   ) { }

   async execute({ id }: IRequest): Promise<IResponse> {
      console.log(id);
      const user = await UserModal.findById(id);
      if (!user) throw new AppError("user does not exist", 404);

      if(user.age != this.dateProvider.compareReturnAge(user.dateBirth)){
        user.updateOne(
          { age: this.dateProvider.compareReturnAge(user.dateBirth) },
        );
      }
      
      const resultUser: IResponse = {
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

export { ProfileUserUseCase };

