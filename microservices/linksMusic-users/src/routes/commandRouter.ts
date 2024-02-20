import { Router } from 'express';
import UserCommandController from '../controllers/UserCommandController';
import UserCommandService from '../services/userCommandService';
import UserCommandRepository from '../models/userCommandRepository';

const userCommandRepository = new UserCommandRepository();
const userCommandService = new UserCommandService(userCommandRepository);
const userCommandController = new UserCommandController(userCommandService);

const commandRouter = Router();


commandRouter.post('/user/history', userCommandController.saveHistory);

commandRouter.post('/user', userCommandController.createUser);

commandRouter.put('/user', userCommandController.updateUser);

commandRouter.put('/user/:id', userCommandController.verifyUser);

commandRouter.delete('/user/:id', userCommandController.deleteUser);

export default commandRouter;