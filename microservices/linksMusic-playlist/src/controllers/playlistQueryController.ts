import { Request, Response } from 'express';
import PlaylistQueryService from '../services/playlistQueryService';
import HandleError from '../helper/error';

export default class PlaylistQueryController {
  private readonly queryService: PlaylistQueryService;

  constructor(queryService: PlaylistQueryService) {
    this.queryService = queryService;
  }

  getAllPlaylist = async (req: Request, res: Response) => {
    const { page, size } = req.query;
    try {
      if (!page && !size) {
        const playlists = await this.queryService.getAllPlaylist();
        if (playlists.length === 0 || playlists === undefined) {
          throw new HandleError(404, 'Bad request', { reason: 'Playlists not found' });
        }
        res.status(200).json(playlists);

      } else {
        if (typeof page !== 'string' || typeof size !== 'string') {
          throw new HandleError(400, 'Bad user input', { reason: 'Page and size are required' });
        }

        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        if (!page || !size) {
          throw new HandleError(400, 'Bad request', { reason: 'Page and size are required' });
        }
        if (isNaN(parseInt(page)) || isNaN(parseInt(size))) {
          throw new HandleError(400, 'Bad request', { reason: 'Page and size must be numbers' });
        }
        const playlists = await this.queryService.getPlaylistPaginate(pageNumber, pageSize);
        if (playlists.length === 0) throw new Error('No playlist found');
        res.status(200).json(playlists);
      }
    } catch (error) {
      if (error instanceof HandleError) {
        res.status(error.code).json({ error: error.message });
      } else res.status(404).json({ error: error.message });
    }
  };

  getPlaylistById = async (req: Request, res: Response) => {
    const { id }= req.params;
    try {
      if (id === undefined) {
        throw new HandleError(400, 'Bad user input', { reason: 'Id is required' });
      }
      const playlist = await this.queryService.getPlaylistById(id);
      if (!playlist) {
        throw new HandleError(404, 'Bad request', { reason: 'Playlist not found' });
      }

      res.status(200).json(playlist);
    } catch (error) {
      if (error instanceof HandleError) {
        res.status(error.code).json({ error: error.message });
      } else res.status(404).json({ error: error.message });
    }
  };

  getUserPlaylist = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!id) throw new HandleError(400, 'Bad user input', { reason: 'Id is required' });
      const playlists = await this.queryService.getUserPlaylist(id);
      if (playlists.length === 0) {
        throw new HandleError(404, 'Playlist not found', { 
          reason: 'The user does not have playlists'
        });
      }

      res.status(200).json(playlists);
    } catch (error) {
      if (error instanceof HandleError) {
        res.status(error.code).json({ error: error.message });
      } else res.status(404).json({ error: error.message });
    }
  };

  getPlaylistMusic = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!id) throw new HandleError(400, 'Bad request', { reason: 'Playlist id is required' });

      const playlist = await this.queryService.getPlaylistMusic(id);
      if (playlist === null) throw new Error('No music found');

      res.status(200).json(playlist);
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  };

  getPlaylistLikes = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!id) throw new HandleError(400, 'Bad request', { reason: 'Playlist id is required' });

      const result = await this.queryService.getPlaylistLikes(id);
      if (result.length === 0) {
        throw new HandleError(404, 'Playlist not found', {
          reason: 'The playlist does not have likes'
        });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  };

  getUserLikes = async (req: Request, res: Response) => {
    const { userId, playlistId } = req.body;
    try {
      if (!userId || !playlistId) {
        throw new HandleError(400, 'Bad request');
      }
      if (typeof userId !== 'string' || typeof playlistId !== 'string') {
        throw new HandleError(400, 'Bad user input', { 
          reason: 'UserId and playlistId must be a string' 
        });
      }
      const result = await this.queryService.getPlaylistUserLikes(userId, playlistId);
      if (result === null) throw new Error('Likes not found');

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}