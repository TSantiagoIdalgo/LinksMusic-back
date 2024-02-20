import PlaylistQueryRepository from '../models/playlistQueryRepository';
import HandleError from '../helper/error';

export default class PlaylistQueryService {
  private readonly playlistQuery: PlaylistQueryRepository;

  constructor(playlistQuery: PlaylistQueryRepository) {
    this.playlistQuery = playlistQuery;
  }

  async getAllPlaylist () {
    try {
      const playlists = await this.playlistQuery.getAll();
      if (playlists.length === 0) throw new HandleError(404, 'Playlist not found');
      return playlists; 
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}`);
      } else throw new Error(error.message);
    }
  } 

  async getPlaylistPaginate (page: number, size: number) {
    try {
      if (!page || !size) {
        throw new HandleError(400, 'Bad request', { reason: 'page and size are required' });
      }
      const playlists = await this.playlistQuery.getPaginate(page, size);
      if (playlists.length === 0) throw new HandleError(404, 'Playlist not found');
      return playlists;
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}${error.data ? ` - ${error.data}` : ''}`);
      } else throw new Error(error.message);
    }
  }

  async getPlaylistById (id: string) {
    try {
      if (!id) throw new HandleError(400, 'Bad request', { reason: 'id is required' });
      const playlist = await this.playlistQuery.getById(id);
      if (!playlist) throw new HandleError(404, 'Playlist not found');
      return playlist;
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}${error.data ? ` - ${error.data}` : ''}`);
      } else throw new Error(error.message);
    }
  }

  async getPlaylistMusic (id: string) {
    try {
      if (!id) throw new HandleError(400, 'Bad request', { reason: 'id is required' });
      const playlist = await this.playlistQuery.getMusic(id);
      if (!playlist) throw new HandleError(404, 'Playlist not found');
      return playlist;
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}${error.data ? ` - ${error.data}` : ''}`);
      } else throw new Error(error.message);
    }
  }

  async getUserPlaylist (userId: string) {
    try {
      if (!userId) throw new HandleError(400, 'Bad request', { reason: 'userId is required' });

      const playlist = await this.playlistQuery.getByUser(userId);
      return playlist;
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}${error.data ? ` - ${error.data}` : ''}`);
      } else throw new Error(error.message);
    }
  }

  async getPlaylistLikes (id: string) {
    try {
      if (!id) throw new HandleError(400, 'Bad request', { reason: 'id is required' });
      const playlist = await this.playlistQuery.getLikes(id);
      if (!playlist) throw new HandleError(404, 'Playlist not found');
      return playlist;
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}${error.data ? ` - ${error.data}` : ''}`);
      } else throw new Error(error.message);
    }
  }

  async getPlaylistUserLikes (userId: string, playlistId: string) {
    try {
      if (!userId || !playlistId) {
        throw new HandleError(400, 'Bad request', { reason: 'userId and playlistId are required' });
      }
      const playlist = await this.playlistQuery.getUserLikes(userId, playlistId);
      if (!playlist) throw new HandleError(404, 'Playlist not found');
      return playlist;
    } catch (error) {
      if (error instanceof HandleError) {
        throw new Error(`Error ${error.code}: ${error.message}${error.data ? ` - ${error.data}` : ''}`);
      } else throw new Error(error.message);
    }
  }
}