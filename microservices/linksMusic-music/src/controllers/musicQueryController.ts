import { Request, Response } from 'express';
import MusicQueryService from '../service/musicQueryService';

export default class MusicQueryController {
  private readonly queryService: MusicQueryService;

  constructor(queryService: MusicQueryService) {
    this.queryService = queryService;
  }

  getPaginateMusic = async (req: Request, res: Response) => {
    const { page, size } = req.query;
    try {
      if (!page || !size) {
        const musics = await this.queryService.getAllMusic();
        res.status(200).json(musics);
      } else {
        if (typeof page !== 'string' || typeof size !== 'string') throw new Error('Page and size are required');

        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        if (!page || !size) throw new Error('Page and size are required');
        if (isNaN(parseInt(page)) || isNaN(parseInt(size))) {
          throw new Error('The page and size must be numbers');
        }

        const musics = await this.queryService.getMusicPaginate(pageNumber, pageSize);
        if (musics.length === 0) throw new Error('No music found');
        res.status(200).json(musics);
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  
  getMusicByAuthor = async (_req: Request, res: Response) => {
    try {
      const album = await this.queryService.getMusicByAlbum();

      if (album.length === 0) throw new Error('No music found');
      res.status(200).json(album);
    } catch (error) {
      
      res.status(404).json({ error: error.message });
    }
  };

  getAllByAuthor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!id) throw new Error('Album is required');

      const albums = await this.queryService.getAllMusicByAlbum(id);
      if (!albums) throw new Error('No music found');
      res.status(200).json(albums);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  getMusicById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (id === undefined) throw new Error('Id is undefined');
      const music = await this.queryService.getMusicById(id);
      if (music === undefined || music === null) throw new Error('Music not found');
      res.status(200).json(music);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  getMusicURL = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
      if (!id) throw new Error('Id is required');
      const url = await this.queryService.getMusicUrl(id);
      res.status(200).send(url);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  getMusicSearch = async (req: Request, res: Response) => {
    const { search } = req.query;
    try {
      if (!search) throw new Error('Search is required');
      if (typeof search !== 'string') throw new Error('Search must be a string');

      const musics = await this.queryService.getMusicSearch(search);

      if (musics.length === 0) throw new Error('No music found');
      res.status(200).json(musics);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getVideoInfo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!id) throw new Error('Id is required');
      const info = await this.queryService.getVideoInfo(id);
      res.status(200).json(info);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
}