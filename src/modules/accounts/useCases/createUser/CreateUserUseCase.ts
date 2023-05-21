import { AppError } from "@shared/errors/AppError";
import { sign } from "jsonwebtoken";
import UserModel from "@models/user";
import auth from "@config/auth";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface MinAndMaxPreference {
  min: number;
  max: number;
}

interface IRequest {
  email: string;
  cellphone: string;
  dateBirth: string;
  password: string;
  name: string;
  city: string;
  state: string;
  country: string;
  location: {
    type: 'Point';
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
  result: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) { }

  async execute({
    email,
    cellphone,
    dateBirth,
    password,
    name,
    city,
    state,
    country,
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
      age: this.dateProvider.compareReturnAge(dateBirth),
      password: await hash(password, 12),
      name,
      city,
      state,
      country,
      location,
      sex,
      sexPreference,
      settings,
    });

    const token = sign({}, secret_token, { expiresIn: expires_in_token });

    const tokenAndUserReturn: IResponse = {
      token: token,
      result: { name: result.name, email: result.email },
    };

    return tokenAndUserReturn;
  }
}

export { CreateUserUseCase };
