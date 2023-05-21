
import { SendForgotPasswordMailController } from '@modules/auth/useCases/SendForgotPasswordMail/SendForgotPasswordMailController';
import { AuthenticateUserController } from '@modules/auth/useCases/authenticateUser/AuthenticateUserController';
import { Router } from 'express';

const authenticateRoutes = Router();

const authenticateController = new AuthenticateUserController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();

authenticateRoutes.post('/', authenticateController.handle);
authenticateRoutes.post('/forgotpassword', sendForgotPasswordMailController.handle);

export { authenticateRoutes };