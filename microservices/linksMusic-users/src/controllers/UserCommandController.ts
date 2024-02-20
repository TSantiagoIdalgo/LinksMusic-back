import { Request, Response } from 'express';
import { IUser } from '../types/user';
import UserCommandService from '../services/userCommandService';

export default class UserCommandController {
  private readonly userCommandService: UserCommandService;

  constructor(userCommandService: UserCommandService) {
    this.userCommandService = userCommandService;
  }

  createUser = async (req: Request, res: Response) => {
    const user: IUser = req.body;

    try {
      if (!user.userName || !user.email || !user.passwordHash) throw new Error('User data is incomplete');
      const newUser = await this.userCommandService.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const user = req.body as IUser;
    try {
      if (user.email === undefined) throw new Error('User id is undefined');
      
      const userUpdated = await this.userCommandService.updateUser(user);
      if (userUpdated === null ) throw new Error('User not found');
      res.status(200).json(userUpdated);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (id === undefined) throw new Error('User id is undefined');

      const user = await this.userCommandService.deleteUser(id);
      if (user === null) throw new Error('User not found');

      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  verifyUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (id === undefined) throw new Error('Token is undefined');
      
      const user = await this.userCommandService.userVerify(id);

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  saveHistory = async (req: Request, res: Response) => {
    const { userId, playlistId, musicId, albumId } = req.body;

    try {
      if (!userId) throw new Error('UserId is undefined');
      if (musicId && !playlistId) {
        const music = await this.userCommandService.saveMusicHistory(userId, musicId);
        res.status(200).json(music);
      } else if (playlistId && !musicId) {
        const playlist = await this.userCommandService.savePlaylistHistory(userId, playlistId);
        res.status(200).json(playlist);
      } else if (albumId && !musicId && !playlistId) {
        const album = await this.userCommandService.saveAlbumHistory(userId, albumId);
        res.status(200).json(album);
      } else {
        throw new Error('MusicId or PlaylistId or albumId is undefined');
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
}