import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { FindUsersController } from '@modules/accounts/useCases/findUsers/FindUsersController';
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController';
import { UploadImageUrlUserController } from '@modules/accounts/useCases/uploadPhoto/UploadPhotoController';
import { Router } from 'express';
import { OTPUserController } from '@modules/accounts/useCases/otpUser/OTPUserController';


const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserUseCase = new ProfileUserController();
const findUsersController = new FindUsersController();
const oTPUserController = new OTPUserController();
const uploadImageUrlUserController = new UploadImageUrlUserController();

usersRoutes.post('/create', createUserController.handle);
usersRoutes.get('/me', profileUserUseCase.handle);
usersRoutes.get('/search', findUsersController.handle);
usersRoutes.get('/otp', oTPUserController.handle);
usersRoutes.post('/imageurl', uploadImageUrlUserController.handle);

export { usersRoutes };

