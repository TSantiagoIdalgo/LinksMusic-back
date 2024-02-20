import MusicQueryRepository from '../models/musicQueryRepository';
import ErrorService from '../helpers/errorHandle';

export default class MusicQueryService {
  private readonly musicQuery: MusicQueryRepository;

  constructor(musicQuery: MusicQueryRepository) {
    this.musicQuery = musicQuery;
  }

  async getAllMusic () {
    try {
      const music = await this.musicQuery.getAll();
      if (music.length === 0) {
        throw new Error('Music not found');
      }
      return music;
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async getMusicPaginate (page: number, size: number) {
    try {
      if (page < 1 || size < 1) throw new Error('Invalid page or size');
      if (!page || !size) throw new Error('Page and size is required');

      const music = await this.musicQuery.getPaginate(page, size);
      if (music.length === 0) throw new Error('Music not found');
    
      return music; 
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async getMusicByAlbum () {
    try {
      const music = await this.musicQuery.getMusicByAlbum();
      if (music.length === 0) throw new Error('Music not found');
      return music;
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async getAllMusicByAlbum (album: string) {
    try {
      if (!album) throw new Error('Album is required');

      const music = await this.musicQuery.getAllMusicByAlbum(album);
      if (!music) throw new Error('Music not found');
      return music;
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async getMusicSearch (search: string) {
    try {
      if (!search) throw new Error('Search is required');

      const music = await this.musicQuery.getMusicSearch(search);
      if (music.length === 0) throw new Error('Music not found');
      return music;
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async getMusicById (id: string) {
    try {
      if (!id) throw new Error('Id is required');

      const music = await this.musicQuery.getById(id);
      if (!music) throw new Error('Music not found');
      return music;
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async getMusicUrl (filename: string) {
    try {
      if (!filename) throw new Error('Filename is required');

      const music = await this.musicQuery.getURL(filename);
      if (!music) throw new Error('Music not found');
      return music; 
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async getVideoInfo (url: string) {
    try {
      if (!url) throw new Error('Url is required');

      const music = await this.musicQuery.getVideoInfo(url);
      if (!music.name) throw new Error('Music not found');
      return music;
    } catch (error) {
      throw new ErrorService(error.message);
    } 
  }
}