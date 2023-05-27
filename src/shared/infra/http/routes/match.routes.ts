import { Router } from 'express';
import { MatchController } from '@modules/match/useCases/match/MatchController';


export const matchRoutes = Router();

const matchController = new MatchController();

matchRoutes.post('/', matchController.handle);

