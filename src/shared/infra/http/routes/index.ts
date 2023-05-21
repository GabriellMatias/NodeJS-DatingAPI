import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { usersRoutes } from './user.routes';


const router = Router();

router.use("/user", usersRoutes);
router.use("/auth", authenticateRoutes);

export { router };