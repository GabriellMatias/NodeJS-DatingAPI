import { resolve } from "path";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import UserModel from "@models/user";

import { sign } from "jsonwebtoken";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const { expires_in_token, secret_token } = auth;

    const user = await UserModel.findOne({ email });
    if (!user) throw new AppError("user does not exist", 404);


    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    const token = sign({}, secret_token, { expiresIn: expires_in_token });

    const variables = {
      name: user.name,
      link: `https://client-mcibiotec.vercel.app/resetpassword/${token}`,
    };

    await UserModel.findOne({ email }).updateOne({
      expiredToken: token,
      expiredDate: this.dateProvider.addHours(3),
    })

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };
