import { Router } from 'express';
import MusicController from '../controllers/musicController';

const fileUploadRouter = Router();

fileUploadRouter.post('/', MusicController.createMusic);

export default fileUploadRouter;