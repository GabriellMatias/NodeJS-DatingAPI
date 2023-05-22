import { AppError } from "@shared/errors/AppError";
import { sign } from "jsonwebtoken";
import UserModel from "@models/user";
import auth from "@config/auth";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ObjectId } from "mongoose";

interface MinAndMaxPreference {
  min: number;
  max: number;
}

interface IRequest {
  email: string;
  cellphone: string;
  dateBirth: string;
  age: number;
  name: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  sex: string;
  sexPreference: string;
  settings: {
    agePreference: MinAndMaxPreference;
    distancePreference: MinAndMaxPreference;
  };
}

interface IResponse {
  id: string;
  result: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    email,
    cellphone,
    dateBirth,
    age,
    name,
    location,
    settings,
    sex,
    sexPreference,
  }: IRequest): Promise<IResponse> {
    const user = await UserModel.findOne({ email });
    const { expires_in_token, secret_token } = auth;

    if (user) throw new AppError("user exist", 409);

    const result = await UserModel.create({
      email,
      cellphone,
      dateBirth: this.dateProvider.convertToUTC(new Date(dateBirth)),
      age,
      name,
      location,
      sex,
      sexPreference,
      settings,
    });

    const token = sign({}, secret_token, { expiresIn: expires_in_token });

    const tokenAndUserReturn: IResponse = {
      token: token,
      id:result._id.toString(),
      result: { name: result.name, email: result.email },
    };

    return tokenAndUserReturn;
  }
}

export { CreateUserUseCase };
