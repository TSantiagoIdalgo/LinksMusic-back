import { Request, Response } from 'express';
import { IFile } from '../types/file';
import { GraphQLError } from 'graphql';
import { IToken, tokenVerify } from '../middlewares/token';
import MusicService from '../services/music';

export default class MusicController {

  static async getPaginateMusic(page: number, size: number) {
    try {
      const music = await MusicService.getPaginate(page, size);
      return music;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getMusicByAuthor() {
    try {
      const music = await MusicService.getByAuthor();
      return music;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    } 
  }

  static async getAllMusicByAuthor(author: string, context: IToken) {
    const { token } = context;
    try {
      if (!author) throw new GraphQLError('Author is required', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
      const music = await MusicService.getAllByAuthor(author, token);
      if (music.length === 0) throw new Error('Music not found');
      return music;
    } catch (error) {
      console.log(error);
      const message: string = error.response?.data || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getMusicSearch(name: string) {
    try {
      if (!name) throw new GraphQLError('Search is required', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
      const music = await MusicService.getSearch(name);
      return music;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getMusicById(id: string) {
    try {
      const music = await MusicService.getById(id);
      return music;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getMusicURL (id: string, context: IToken) {
    const { token } = context;
    try {
      const music = await MusicService.getMusicURL(id, token);
      return music.data;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getMusicInfo (id: string) {
    try {
      if (!id) throw new GraphQLError('Id is required', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
      const music = await MusicService.getMusicInfo(id);
      return music;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async createMusic(req: Request, res: Response) {
    const token = req.headers.authorization;
    const file = req.files?.files as IFile;
    try {
      if (!token) throw new Error('Token is required');
      const { user } = tokenVerify(token);
      if (!user) throw new Error('User is required');
      if (!file) throw new Error('File is required');

      const music = await MusicService.upload(file, token);
      res.status(201).json(music.data);
    } catch (error) {
      const message: string = error.response?.data?.error ?? error.message;
      res.status(400).json({ error: message });
    }
  }

  static async postMusicByUrl (videoId: string, context: IToken) {
    const { token } = context;
    try {
      const { user } = tokenVerify(token);
      
      if (!user) throw new GraphQLError('Invalid authentication token', {
        extensions: { code: 'UNAUTHENTICATED' },
      });

      const music = await MusicService.uploadByUrl(videoId, token);
      return music;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async deleteMusic (id: string, context: IToken) {
    const { token } = context;

    try {
      if (!token) throw new GraphQLError('Invalid authentication token', {
        extensions: { code: 'UNAUTHENTICATED' },
      });
      const { user } = tokenVerify(token);
      if (!user) throw new GraphQLError('Invalid authentication token', {
        extensions: { code: 'UNAUTHENTICATED' },
      });

      const music = await MusicService.deleteMusic(id, token);
      return music;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }
}