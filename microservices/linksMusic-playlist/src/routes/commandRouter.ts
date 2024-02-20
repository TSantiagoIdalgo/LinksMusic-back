import { Router } from 'express';
import PlaylistCommandController from '../controllers/playlistCommandController';
import PlaylistCommandService from '../services/playlistCommandService';
import PlaylistCommandRepository from '../models/playlistCommandRepository';

const playlistCommandRepositort = new PlaylistCommandRepository();
const playlistCommandService = new PlaylistCommandService(playlistCommandRepositort);
const playlistCommandController = new PlaylistCommandController(playlistCommandService);

const commandRouter = Router();

commandRouter.post('/playlist', playlistCommandController.createPlaylist);

commandRouter.post('/playlist/add', playlistCommandController.addMusicToPlaylist);

commandRouter.post('/playlist/like', playlistCommandController.updateLikes);

commandRouter.put('/playlist/:id', playlistCommandController.updatePlaylist);

commandRouter.delete('/playlist/:musicId/:playlistId', playlistCommandController.removeMusicFromPlaylist);

commandRouter.delete('/playlist/:id', playlistCommandController.deletePlaylist);

export default commandRouter;