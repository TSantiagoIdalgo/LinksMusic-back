import { Router } from 'express';

import UserQueryController from '../controllers/UserQueryController';
import UserQueryService from '../services/userQueryService';
import UserQueryRepository from '../models/userQueryRepository';

const userQueryRepository = new UserQueryRepository();
const userQueryService = new UserQueryService(userQueryRepository);
const userQueryController = new UserQueryController(userQueryService);

const queryRouter = Router();

queryRouter.get('/user', userQueryController.getAllUser);

queryRouter.get('/user/:id', userQueryController.getUserById);

queryRouter.get('/user/history/:userId', userQueryController.getHistory);

queryRouter.get('/user/music/:id', userQueryController.getUserMusic);

queryRouter.post('/login', userQueryController.userLogin);

queryRouter.post('/login/network', userQueryController.userNetworkLogin);

export default queryRouter;