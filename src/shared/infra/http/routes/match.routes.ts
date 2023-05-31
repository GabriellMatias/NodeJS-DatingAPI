import { Router } from 'express';
import { MatchController } from '@modules/match/useCases/match/MatchController';
import { FindMatchController } from '@modules/match/useCases/findMatch/FindMatchController';
import { FindMatchTextController } from '@modules/match/useCases/findMatchText/FindMatchTextController';

export const matchRoutes = Router();

const matchController = new MatchController();
const findMatchController = new FindMatchController();
const findMatchTextController = new FindMatchTextController();

matchRoutes.post('/', matchController.handle);
matchRoutes.get('/', findMatchController.handle);
matchRoutes.get('/text', findMatchTextController.handle);
