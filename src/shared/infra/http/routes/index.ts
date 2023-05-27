import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { usersRoutes } from './user.routes';
import { matchRoutes } from './match.routes';

export const router = Router();

router.use("/user", usersRoutes);
router.use("/auth", authenticateRoutes);
router.use('/match', matchRoutes);
