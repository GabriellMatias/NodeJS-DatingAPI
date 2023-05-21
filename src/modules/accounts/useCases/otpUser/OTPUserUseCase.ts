import { AppError } from "@shared/errors/AppError";
import UserModel from "@models/user";
const twilio = require('twilio');

interface IRequest {
  cellphone: string;
}

interface IResponse {
  otp: number;
  success: boolean;
  sid: number;
}

const accountSid = 'ACd7ee477899295d7d494795fd4e7217c7';
const authToken = 'a1d77a9297953f882416c270beb96db4';
const client = twilio(accountSid, authToken);

class OTPUserUseCase {
  async execute({
    cellphone,
  }: IRequest): Promise<IResponse> {
    let success = false;
    let sid = 0;

    const user = await UserModel.findOne({ cellphone });

    if (user) throw new AppError("user exist", 409);
    
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
      sid
    };
  }
}

export { OTPUserUseCase };
