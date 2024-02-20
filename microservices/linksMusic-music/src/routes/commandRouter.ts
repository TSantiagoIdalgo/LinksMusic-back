import { Router } from 'express';
import MusicCommandController from '../controllers/musicCommandController';
import MusicCommandService from '../service/musicCommandService';
import MusicCommandRepository from '../models/musicCommandRepository';
import MusicQueryRepository from '../models/musicQueryRepository';

const musicCommand = new MusicCommandRepository();
const musicQuery = new MusicQueryRepository();
const musicService = new MusicCommandService(musicCommand, musicQuery);
const musicController = new MusicCommandController(musicService);

const commandRouter = Router();

commandRouter.post('/music/upload', musicController.postMusic);

commandRouter.post('/music/url', musicController.postMusicByUrl);

commandRouter.delete('/music/:id', musicController.deleteMusic);

export default commandRouter;