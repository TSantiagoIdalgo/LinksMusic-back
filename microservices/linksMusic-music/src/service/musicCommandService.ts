import { IMusic } from '../types/music';
import { fileUrlUpload } from '../helpers/fileURLupload';
import MusicCommandRepository from '../models/musicCommandRepository';
import MusicQueryRepository from '../models/musicQueryRepository';
import ErrorService from '../helpers/errorHandle';
import mm from 'music-metadata';

export default class MusicCommandService {
  private readonly musicCommand: MusicCommandRepository;
  private readonly musicQuery: MusicQueryRepository;

  constructor(musicCommand: MusicCommandRepository, musicQuery: MusicQueryRepository) {
    this.musicCommand = musicCommand;
    this.musicQuery = musicQuery;
  }

  async createMusic (file: IMusic, token: string) {
    try {
      if (!file) throw new Error('File is required');
      
      const user = await this.musicQuery.TokenVerify(token);
      if (!user) throw new Error('User not found');

      const metadata = await mm.parseFile(file.tempFilePath as string);

      const musicFind = await this.musicQuery.getMusicByName(metadata.common.title ?? file.name);
      if (musicFind) throw new Error('Music already exists');

      return await this.musicCommand.create(file, user.email, metadata);
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async createMusicByUrl (id: string, token: string ) {
    try {
      if (!id) throw new Error('Id is required');
      if (!token) throw new Error('Token is required');

      const user = await this.musicQuery.TokenVerify(token);
      if (!user) throw new Error('User not found');

      const { audioDetails, audioBuffer } = await fileUrlUpload(id, user.email);
      const musicFind = await this.musicQuery.getMusicByName(audioDetails.name);
      if (musicFind !== null) throw new Error('Music already exists');

      return await this.musicCommand.createByUrl(user.email, audioDetails, audioBuffer);
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async deleteMusic (id: string, token: string) {
    try {
      if (!id) throw new Error('Id is required');
      if (!token) throw new Error('Token is required');

      const user = await this.musicQuery.TokenVerify(token);
      if (!user.email) throw new Error('User not found');

      const music = await this.musicQuery.getById(id);
      if (!music) throw new Error('Music not found');
      await this.musicCommand.delete(id); 

      return music;

    } catch (error) {
      throw new ErrorService(error.message);
    }
  }
}