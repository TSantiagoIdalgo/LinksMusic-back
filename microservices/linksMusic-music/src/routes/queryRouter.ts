import { Router } from 'express';

import MusicQueryController from '../controllers/musicQueryController';
import MusicQueryService from '../service/musicQueryService';
import MusicQueryRepository from '../models/musicQueryRepository';

const musicRepository = new MusicQueryRepository();
const musicService = new MusicQueryService(musicRepository);
const musicController = new MusicQueryController(musicService);

const queryRouter = Router();

queryRouter.get('/music', musicController.getPaginateMusic);

queryRouter.get('/music/unique/:id', musicController.getMusicById);

queryRouter.get('/music/play/:id', musicController.getMusicURL);

queryRouter.get('/music/author', musicController.getMusicByAuthor);

queryRouter.get('/music/author/:id', musicController.getAllByAuthor);

queryRouter.get('/music/search', musicController.getMusicSearch);

queryRouter.get('/music/info/:id', musicController.getVideoInfo);

export default queryRouter;