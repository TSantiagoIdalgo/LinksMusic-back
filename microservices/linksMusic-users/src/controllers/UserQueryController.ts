import { Request, Response } from 'express';
import UserQueryService from '../services/userQueryService';

export default class UserQueryController {
  private readonly queryService: UserQueryService;

  constructor(queryService: UserQueryService) {
    this.queryService = queryService;
  }

  getAllUser = async  (_req: Request, res: Response) => {
    try {
      const users = await this.queryService.getAlluser();
      if (users.length === 0) throw new Error('Users not found');
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (id === undefined) throw new Error('User id is undefined');

      const user = await this.queryService.getUserById(id);
      if (user === undefined || user === null) throw new Error('User not found');
      
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  userLogin = async (req: Request, res: Response) => {
    const { email, passwordHash } = req.body;
    
    try {
      if (!email || !passwordHash) throw new Error('User data is incomplete');

      const user = await this.queryService.userLogin(email, passwordHash);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  userNetworkLogin = async (req: Request, res: Response) => {
    const { email, userName, image } = req.body;

    try {
      if (!email || !userName) throw new Error('User data is incomplete');

      const user = await this.queryService.userNetworkLogin(userName, email, image);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }

  };

  getUserMusic = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!id) throw new Error('Id is required');

      const music = await this.queryService.getUserMusic(id);
      if (music.length === 0) throw new Error('Music not found');
      res.status(200).json(music);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  getHistory = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      if (userId === undefined) throw new Error('UserId is undefined');
      const user = await this.queryService.getUserHistory(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error.message);
    }

  };
}