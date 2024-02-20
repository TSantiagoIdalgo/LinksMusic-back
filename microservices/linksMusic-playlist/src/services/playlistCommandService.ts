import { IPlaylistModel, TPlaylistAction } from '../types/playlist';
import PlaylistCommandRepository from '../models/playlistCommandRepository';
import HandleError from '../helper/error';
import { IMusicModel } from '../types/music';

export default class PlaylistCommandService {
  private readonly commandRepository: PlaylistCommandRepository;

  constructor(commandRepository: PlaylistCommandRepository) {
    this.commandRepository = commandRepository;
  }

  async createPlaylist(playlist: IPlaylistModel): Promise<IPlaylistModel> {
    try {
      if (!playlist.tittle || !playlist.description || !playlist.userId) {
        throw new HandleError(400, 'Bad user input', { reason: 'Missing required fields' });
      }
      return this.commandRepository.create(playlist);
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}${error.data ? ` - ${error.data}` : ''}`);
      } else throw new Error(error.message);
    }
  }

  async deletePlaylist(id: string): Promise<IPlaylistModel> {
    try {
      if (!id) throw new HandleError(400, 'Bad user input', { reason: 'Missing required fields' });
      const playlist = await this.commandRepository.delete(id);

      if (!playlist) throw new HandleError(404, 'Not found', { reason: 'Playlist not found' });
      return playlist;
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}${error.data ? ` - ${error.data}` : ''}`);
      } else throw new Error(error.message);
    }
  }

  async updatePlaylist(id: string, playlist: IPlaylistModel): Promise<IPlaylistModel> {
    try {
      if (!id) throw new HandleError(400, 'Bad user input', { reason: 'Missing required fields' });

      const playlistUpdated = await this.commandRepository.update(id, playlist);
      if (!playlistUpdated) throw new HandleError(404, 'Not found', { reason: 'Playlist not found' });

      return playlistUpdated;
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}${error.data ? ` - ${error.data}` : ''}`);
      } else throw new Error(error.message);
    }
  }

  async addMusicToPlaylist (musicId: string, playlistId: string): Promise<IMusicModel> {
    try {
      if (!musicId || !playlistId) {
        throw new HandleError(400, 'Bad user input', { reason: 'Missing required fields' });
      }

      const playlist = await this.commandRepository.addPlaylist(musicId, playlistId);
      if (!playlist) throw new HandleError(404, 'Not found', { reason: 'Playlist not found' });

      return playlist;
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}${error.data ? ` - ${error.data}` : ''}`);
      } else throw new Error(error.message);
    }
  }

  async removeMusicFromPlaylist (musicId: string, playlistId: string): Promise<IMusicModel> {
    try {
      if (!musicId || !playlistId) {
        throw new HandleError(400, 'Bad user input', { reason: 'Missing required fields' });
      }

      const playlist = await this.commandRepository.removeFromPlaylist(musicId, playlistId);
      if (!playlist) throw new HandleError(404, 'Not found', { reason: 'Playlist not found' });

      return playlist;
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}${error.data ? ` - ${error.data}` : ''}`);
      } else throw new Error(error.message);
    }
  }

  async updatePlaylistLikes (playlistId: string, userId: string, action: TPlaylistAction) {
    try {
      if (!playlistId || !userId || !action) {
        throw new HandleError(400, 'Bad user input', { reason: 'Missing required fields' });
      }
      return await this.commandRepository.updateLikes(playlistId, userId, action);
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}${error.data ? ` - ${error.data}` : ''}`);
      } else throw new Error(error.message);
    }
  }
}