import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mcibiotec@gmail.com",
        pass: "gvgkmvuojsmvltpv",
      },
      port: 465,
      secure: true,
      host: "smtp.gmail.com",
    });

    this.client = transporter;
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: "MCIBioTec <mcibiotec@gmail.com>",
      subject,
      html: templateHTML,
    }).then((message)=> {
      console.log("Message sent: %s", message.messageId);
    })
  }
}

export { EtherealMailProvider };
