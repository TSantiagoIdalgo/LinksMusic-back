import { Router } from 'express';
import PlaylistQueryController from '../controllers/playlistQueryController';
import PlaylistQueryService from '../services/playlistQueryService';
import PlaylistQueryRepository from '../models/playlistQueryRepository';

const playlistQueryRepository = new PlaylistQueryRepository();
const playlistQueryService = new PlaylistQueryService(playlistQueryRepository);
const playlistQueryController = new PlaylistQueryController(playlistQueryService);

const queryRouter = Router();


queryRouter.get('/playlist', playlistQueryController.getAllPlaylist);

queryRouter.get('/playlist/:id', playlistQueryController.getPlaylistById);

queryRouter.get('/playlist/user/:id', playlistQueryController.getUserPlaylist);

queryRouter.get('/playlist/music/:id', playlistQueryController.getPlaylistMusic);

queryRouter.get('/playlist/likes/:id', playlistQueryController.getPlaylistLikes);

queryRouter.post('/playlist/user/likes', playlistQueryController.getUserLikes);

export default queryRouter;