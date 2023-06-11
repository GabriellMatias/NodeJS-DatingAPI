import { AppError } from "@shared/errors/AppError";
import UserModel from "@models/user";
const twilio = require('twilio');

interface IRequest {
  cellphone: string;
}

interface IResponse {
  otp: number;
  success: boolean;
  userExists: boolean;
  sid: number;
}

const accountSid = process.env.TWILIO_ACCOUNT
const authToken = process.env.TWILIO_TOKEN
const client = twilio(accountSid, authToken);

class OTPUserUseCase {
  async execute({
    cellphone,
  }: IRequest): Promise<IResponse> {
    let userExists = false;
    let success = false;
    let sid = 0;

    const user = await UserModel.findOne({ cellphone });

    if (user) {
      userExists = true;
    }
    
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    

    try {
      // const mensagemEnviada = await client.messages.create({
      //   body: `Your verification code is: ${otp}`,
      //   from: '(778) 718-3615',
      //   to: cellphone
      // });
  
      //sid = mensagemEnviada.sid;
      success = true;
    } catch (error) {
      console.error('Erro ao enviar a mensagem SMS:', error);
    }

    return {
      otp,
      success,
      userExists,
      sid
    };
  }
}

export { OTPUserUseCase };
