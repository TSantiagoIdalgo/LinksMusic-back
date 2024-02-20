import MusicCommandService from '../service/musicCommandService';
import { Request, Response } from 'express';
import { IMusic } from '../types/music';
import { unlinkSync } from 'fs';
import { fileType } from '../helpers/fileType';



export default class MusicCommandController {
  private readonly musicCommandService: MusicCommandService;
    
  constructor(musicCommandService: MusicCommandService) {
    this.musicCommandService = musicCommandService;
  }

  postMusic = async (req: Request, res: Response): Promise<void> => {
    const file = req.files?.files as IMusic | undefined;
    const token = req.headers.authorization;
    try {
      if (!file) throw new Error('File is required');
      if (!token) throw new Error('Token is required');
      if (fileType(file)) throw new Error('File type is not supported');
      
      const result = await this.musicCommandService.createMusic(file, token);

      res.status(201).json(result);
    } catch (error) {
      if (file && file.tempFilePath) unlinkSync(file.tempFilePath);
      res.status(400).json({ error: error.message });
    }
  };

  postMusicByUrl = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization;
    const { id } = req.body;

    try {
      if (!id || typeof id !== 'string') throw new Error('Id are required');
      if (!token) throw new Error('Token is required');

      const newMusic = await this.musicCommandService.createMusicByUrl(id, token);
      res.status(201).json(newMusic);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteMusic = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const token = req.headers.authorization;
    try {
      if (!id) throw new Error('Id is required');
      if (!token) throw new Error('Token is required');
      const music = await this.musicCommandService.deleteMusic(id, token);
      if (music === null) throw new Error('Music not found');
      res.status(200).json(music);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
}