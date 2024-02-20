import { IFile } from '../types/file';
import { MUSIC_SERVICE, USER_SERVICE } from '../config/api';
import { IMusic } from '../types/music';
import { IUser } from '../types/user';
import { verify } from 'jsonwebtoken';
import { IAlbum } from '../types/album';
import axios from 'axios';

export default class MusicService {

  static async getPaginate (page: number | undefined, size: number | undefined) {
    const { data } = await axios
      .get<IMusic[]>(`${MUSIC_SERVICE}/${page || size 
        ? `music?page=${page}&size=${size}`
        : 'music'}`);
    return data;
  }

  static async getByAuthor () {
    const { data } = await axios.get<IAlbum[]>(`${MUSIC_SERVICE}/music/author`);
    return data;
  }

  static async getAllByAuthor (author: string, token: string) {
    if (token) {
      const tokenSecure = token.split(' ')[1];
      const decoded = verify(tokenSecure, process.env.SECRET as string) as IUser;

      await axios.post(`${USER_SERVICE}/user/history`, {
        userId: decoded.email,
        albumId: author,
      });
    }
    const { data } = await axios.get<IAlbum[]>(`${MUSIC_SERVICE}/music/author/${author}`);
    return data;
  }

  static async getSearch (search: string) {
    const { data } = await axios.get<IMusic[]>(`${MUSIC_SERVICE}/music/search?search=${search}`);
    return data; 
  }

  static async getById (id: string) {
    const { data } = await axios.get<IMusic, IMusic>(`${MUSIC_SERVICE}/music/unique/${id}`);
    return data;
  }

  static async getMusicURL (id: string, token: string) {
    if (token) {
      const tokenSecure = token.split(' ')[1];
      const decoded = verify(tokenSecure, process.env.SECRET as string) as IUser;

      await axios.post(`${USER_SERVICE}/user/history`, {
        userId: decoded.email,
        musicId: id,
      });
    }
    const musicId = `${id.split('-').join('')}.mp3`;
    return await axios<IMusic, IMusic>(`${MUSIC_SERVICE}/music/play/${musicId}`);
  }

  static async getMusicInfo (id: string) {
    const { data } = await axios.get<IMusic>(`${MUSIC_SERVICE}/music/info/${id}`);
    return data;
  }

  static async upload(file: IFile, token: string) {
    const config = {
      headers: {
        'Authorization': token
      },
    };
    const archivoBlob = new Blob([file.data], { type: file.mimetype });  

    const formData = new FormData();
    formData.append('files', archivoBlob, file.name);
    
    const { data } = await axios.post<IMusic>(`${MUSIC_SERVICE}/music/upload`, formData, config);
    return data;
  }

  static async uploadByUrl(url: string, token: string) {
    const config = {
      headers: { 'Authorization': token }
    };

    const { data } = await axios.post<IMusic>(`${MUSIC_SERVICE}/music/url`, { id: url }, config);

    return data;
  }

  static async deleteMusic (id: string, token: string) {
    const config = {
      headers: { 'Authorization': token },
    };
    const { data } = await axios.delete<IMusic, IMusic>(`${MUSIC_SERVICE}/music/${id}`, config);
    return data;
  }
}