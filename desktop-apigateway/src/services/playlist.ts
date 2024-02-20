import { IPlaylist, IPlaylistInteraction, IPlaylistAction } from '../types/playlist';
import { PLAYLIST_SERVICE, USER_SERVICE } from '../config/api';
import { IMusic } from '../types/music';
import { verify } from 'jsonwebtoken';
import axios from 'axios';
import { IUser } from '../types/user';

export default class Playlist {
  static async getPlaylist(size: number | undefined, page: number | undefined): Promise<IPlaylist[]> {
    const { data } = await axios.get<IPlaylist[]>(`${PLAYLIST_SERVICE}/${page && size 
      ? `playlist?page=${page}&size=${size}`
      : 'playlist'}`);
    return data;
  }

  static async getById (id: string): Promise<IPlaylist> {
    const { data } = await axios.get<IPlaylist>(`${PLAYLIST_SERVICE}/playlist/${id}`);
    return data;
  }

  static async getUserPlaylist (userId: string): Promise<IPlaylist[]> {
    const { data } = await axios.get<IPlaylist[]>(`${PLAYLIST_SERVICE}/playlist/user/${userId}`);
    return data;
  }

  static async getPlaylistMusic (id: string, token: string): Promise<IPlaylist> {
    if (token) {
      const tokenSecure = token.split(' ')[1];
      const decoded = verify(tokenSecure, process.env.SECRET as string) as IUser;

      await axios.post(`${USER_SERVICE}/user/history`, {
        userId: decoded.email,
        playlistId: id,
      });
    }


    const { data } = await axios.get<IPlaylist>(`${PLAYLIST_SERVICE}/playlist/music/${id}`);
    return data;
  }

  static async getLikes (playlistId: string): Promise<IPlaylistInteraction[]> {
    const { data } = await axios.get<IPlaylistInteraction[]>(`${PLAYLIST_SERVICE}/playlist/likes/${playlistId}`);
    return data; 
  }

  static async getUserLikes (userId: string, playlistId: string): Promise<IPlaylistInteraction> {
    const body = {
      userId,
      playlistId
    };
    const { data } = await axios.post<IPlaylistInteraction>(`${PLAYLIST_SERVICE}/playlist/user/likes`, body);
    return data;
  }

  static async create(playlist: IPlaylist): Promise<IPlaylist> {
    const { data } = await axios.post<IPlaylist>(`${PLAYLIST_SERVICE}/playlist`, playlist);
    return data;
  }

  static async addMusic (musicId: string, playlistId: string): Promise<IMusic> {
    const body = {
      musicId: musicId,
      playlistId: playlistId
    };
    const { data } = await axios.post<IMusic>(`${PLAYLIST_SERVICE}/playlist/add`, body);
    return data;
  }

  static async update (id: string, playlist: IPlaylist): Promise<IPlaylist> {
    const { data } = await axios.put<IPlaylist>(`${PLAYLIST_SERVICE}/playlist/${id}`, playlist);
    return data;
  }

  static async delete (id: string): Promise<IPlaylist> {
    const { data } = await axios.delete<IPlaylist>(`${PLAYLIST_SERVICE}/playlist/${id}`);
    return data;
  }

  static async remove (musicId: string, playlistId: string): Promise<IMusic> {
    const { data } = await axios.delete<IMusic>(`${PLAYLIST_SERVICE}/playlist/${musicId}/${playlistId}`);

    return data;
  }

  static async updateLike (playlistId: string, userId: string, action: IPlaylistAction) {
    const body = {
      playlistId: playlistId,
      userId: userId,
      action: action
    };
    const { data } = await axios.post<IPlaylistInteraction>(`${PLAYLIST_SERVICE}/playlist/like`, body);
    return data;
  }
}