import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { FindUsersController } from '@modules/accounts/useCases/findUsers/FindUsersController';
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController';
import { ResetPasswordUserController } from '@modules/accounts/useCases/ResetPasswordUser/ResetPasswordUserController';
import { ICustomRequest } from '@modules/accounts/useCases/uploadPhoto/UploadPhotoController';
import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';
import { UploadPhotoUseCase } from '@modules/accounts/useCases/uploadPhoto/UploadPhotoUseCase';
import { OTPUserController } from '@modules/accounts/useCases/otpUser/OTPUserController';

// Configuração do multer
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserUseCase = new ProfileUserController();
const findUsersController = new FindUsersController();
const oTPUserController = new OTPUserController();
const resetPasswordUserController = new ResetPasswordUserController();

usersRoutes.post('/create', createUserController.handle);
usersRoutes.get('/me', profileUserUseCase.handle);
usersRoutes.post('/search', findUsersController.handle);
usersRoutes.get('/otp', oTPUserController.handle);
usersRoutes.post('/resetpassword', resetPasswordUserController.handle);

usersRoutes.post('/uploadimage', upload.single('file'), async (req: ICustomRequest, res) => {
  const file = req.file;
  const id = req.body.id;

  const uploadPhotoController = container.resolve(UploadPhotoUseCase);

  await uploadPhotoController.execute({
    file: file,
    id: id as string,
  });

  return res.json({ message: 'Imagem enviada com sucesso!' });
});

export { usersRoutes };

