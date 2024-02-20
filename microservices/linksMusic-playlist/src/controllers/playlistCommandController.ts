import { Request, Response } from 'express';
import { IPlaylistModel } from '../types/playlist';
import PlaylistCommandService from '../services/playlistCommandService';
import HandleError from '../helper/error';

export default class PlaylistCommandController {
  private readonly commandService: PlaylistCommandService;

  constructor(commandService: PlaylistCommandService) {
    this.commandService = commandService;
  }

  createPlaylist = async (req: Request, res: Response) => {
    const playlist: IPlaylistModel = req.body;
    try {
      if (!playlist.tittle || !playlist.description || !playlist.userId) {
        throw new HandleError(400, 'Bad user input', { reason: 'Mising data' });
      }
  
      const playlistCreated = await this.commandService.createPlaylist(playlist);
      
      res.status(201).json(playlistCreated);
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  };

  deletePlaylist = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!id) throw new HandleError(400, 'Bad user input', { reason: 'Mising data' });

      const playlist = await this.commandService.deletePlaylist(id);
      if (playlist === null) {
        throw new HandleError(404, 'Not found', { reason: 'Playlist not found' });
      }
      
      res.status(200).json(playlist);
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  };

  updatePlaylist = async (req: Request, res: Response) => {
    const { id } = req.params;
    const playlist: IPlaylistModel = req.body;
    try {
      if (!id) throw new HandleError(400, 'Bad user input', { reason: 'PlaylistId is required'});
      
      const playlistUpdated = await this.commandService.updatePlaylist(id, playlist);
      if (playlistUpdated === null) throw new Error('Playlist not found');

      res.status(200).json(playlistUpdated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  addMusicToPlaylist = async (req: Request, res: Response) => {
    const { musicId, playlistId } = req.body;
    try {
      if (!musicId || !playlistId) {
        throw new HandleError(400, 'Bad user input', { reason: 'Mising data' });
      }
      const result = await this.commandService.addMusicToPlaylist(musicId, playlistId);
      if (result === null) {
        throw new HandleError(404, 'Not found', { reason: 'Music or playlist not found' });
      }
      
      res.status(201).json(result);
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  };

  removeMusicFromPlaylist = async (req: Request, res: Response) => {
    const { musicId, playlistId } = req.params;
    
    try {
      if (!musicId || !playlistId) {
        throw new HandleError(400, 'Bad user input', { reason: 'Mising data' });
      }
      const music = await this.commandService.removeMusicFromPlaylist(musicId, playlistId);
      if (music === null) {
        throw new HandleError(404, 'Not found', { reason: 'Music or playlist not found' }); 
      }

      res.status(200).json(music);
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  };

  updateLikes = async (req: Request, res: Response) => {
    const { playlistId, userId, action } = req.body;

    try {
      if (action !== 'likes' && action !== 'dislikes') {
        throw new HandleError(400, 'Bad user input', { reason: 'Mising data' });
      }
      if (!playlistId || !userId) throw new Error('Id is required');

      const result = await this.commandService.updatePlaylistLikes(playlistId, userId, action);

      res.status(200).json(result);
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  };
}