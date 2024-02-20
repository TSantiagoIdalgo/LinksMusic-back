import { IPlaylist, IPlaylistAction, IPlaylistInteraction } from '../types/playlist';
import { GraphQLError } from 'graphql';
import Playlist from '../services/playlist';
import { IMusic } from '../types/music';
import { IToken, tokenVerify } from '../middlewares/token';

export default class PlaylistController {
  static async getAllPlaylist(size: number | undefined, page: number | undefined) {
    try {
      const playlists = await Playlist.getPlaylist(size, page);
      return playlists;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getPlaylistById (id: string): Promise<IPlaylist> {
    try {
      const playlist = await Playlist.getById(id);
      return playlist;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getUserPlaylist (context: IToken): Promise<IPlaylist[]> {
    const { token } = context;
    try {
      const { user } = tokenVerify(token);
      if (!user) throw new GraphQLError('Invalid authentication token', {
        extensions: { code: 'UNAUTHENTICATED' }
      });
      const playlists = await Playlist.getUserPlaylist(user);
      return playlists;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getPlaylistMusic (id: string, context: IToken): Promise<IPlaylist> {
    const { token } = context;
    try {
      const playlist = await Playlist.getPlaylistMusic(id, token);
      return playlist;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getPlaylistLikes (playlistId: string): Promise<IPlaylistInteraction[]> {
    try {
      if (!playlistId) throw new GraphQLError('Invalid playlist id', {
        extensions: { code: 'BAD_USER_INPUT' }
      });

      const playlist = await Playlist.getLikes(playlistId);
      return playlist;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getUserLikes (playlistId: string, context: IToken): Promise<IPlaylistInteraction> {
    const { token } = context;
    try {
      const { user } = tokenVerify(token);
      if (!playlistId) throw new GraphQLError('UserId and playlistId are required', {
        extensions: { code: 'BAD_USER_INPUT' }
      });

      const playlist = await Playlist.getUserLikes(user, playlistId);
      return playlist;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async createPlaylist(playlist: IPlaylist, context: IToken): Promise<IPlaylist> {
    const { token } = context;
    try {
      const { user } = tokenVerify(token);
      
      if (!user) throw new GraphQLError('Invalid authentication token', {
        extensions: { code: 'UNAUTHENTICATED' }
      });
      
      const newPlaylist = await Playlist.create({ ...playlist, userId: user});
      return newPlaylist;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async addMusicToPlaylist (musicId: string, playlistId: string): Promise<IMusic> {
    try {
      const music = await Playlist.addMusic(musicId, playlistId);
      return music;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async removeMusicFromPlaylist (musicId: string, playlistId: string): Promise<IMusic> {
    try {
      const music = await Playlist.remove(musicId, playlistId);
      return music;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async updatePlaylist (id: string, playlist: IPlaylist): Promise<IPlaylist> {
    try {
      const playlistUpdated = await Playlist.update(id, playlist);
      return playlistUpdated;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async deletePlaylist (id: string, context: IToken): Promise<IPlaylist> {
    const { token } = context;
    try {
      const { user } = tokenVerify(token);
      
      if (!user) throw new GraphQLError('Invalid authentication token', {
        extensions: { code: 'UNAUTHENTICATED' }
      });
      const playlist = await Playlist.delete(id);
      return playlist;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async interactionPlaylist (playlistId: string, action: IPlaylistAction, context: IToken) {
    const { token } = context;
    try {
      const { user } = tokenVerify(token);
      
      if (!user) throw new GraphQLError('Invalid authentication token', {
        extensions: { code: 'UNAUTHENTICATED' }
      });
      const playlist = await Playlist.updateLike(playlistId, user, action );
      return playlist;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }
}