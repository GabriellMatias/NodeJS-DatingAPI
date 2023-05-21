import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import UserModel from "@models/user";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";

interface IRequest {
   token: string;
   password: string;
}
@injectable()
class ResetPasswordUserUseCase {
   constructor(
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
   ) { }

   async execute({ token, password }: IRequest): Promise<void> {


    const user = await UserModel.findOne({ expiredToken:token });
    if (!user) throw new AppError("user does not exist", 404);
    
    const token_is_expired = this.dateProvider.compareIfBefore(
      user.expiredDate,
      this.dateProvider.dateNow(),
    );

    if (token_is_expired) {
      throw new AppError('Token expired');
    }

    await user.updateOne({
      password: await hash(password, 12),
      expiredToken: null,
    })

   }
}

export { ResetPasswordUserUseCase };
