import { IUser, IUserModel } from '../types/user';
import { sendVerifyMail } from '../mailService/mail/mail.services';
import UserModel from '../database/tables/userModel';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import HistoryModel from '../database/tables/historyModel';
import AlbumModel from '../database/tables/albumModel';
import PlayListModel from '../database/tables/playlistModel';
import MusicModel from '../database/tables/musicModel';

export default class UserCommandRepository {
    
  async create (user: IUser): Promise<IUserModel> {
    const userFind = await UserModel.findOne({ where: { email: user.email } });
    if (userFind) throw new Error('User already exists');
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.passwordHash, salt);
    const newUser = await UserModel.create({
      userName: user.userName,
      email: user.email,
      passwordHash,
      verify: false
    });

    const userToken = {
      email: user?.email
    };
    const token = Jwt.sign(userToken, process.env.SECRET as string);
    await sendVerifyMail(user.email, user.userName, token);

    return newUser;
  }

  async update (user: IUser): Promise<IUserModel | null> {
    const userUpdated = await UserModel.findOne({
      where: {
        email: user.email,
        verify: true
      }
    });
    userUpdated?.set(user);
    userUpdated?.save();
    return userUpdated;
  }

  async delete (id: string): Promise<IUserModel | null> {
    const user = await UserModel.findByPk(id);
    if (!user) return null;

    await user.destroy();
    return user;
  }

  
  async verify (token: string): Promise<IUser> {
    const user = Jwt.verify(token, process.env.SECRET as string) as IUserModel;

    if (!user) throw new Error('Invalid token');
    const userFind = await UserModel.findOne({ where: { email: user.email } });

    if (!userFind) throw new Error('Invalid token');

    userFind?.set({ verify: true });
    userFind?.save();

    return userFind;
  }

  async saveMusicHistory (userId: string, musicId: string) {
    const music = await MusicModel.findByPk(musicId);
    if (!music) throw new Error('Music not found');
    
    const history = await HistoryModel.findOne({ where: { userId, musicId } });
    
    if (history) {
      history?.set({ timestamp: new Date() });
      await history?.save();
      return history;
    }

    const newHistory = await HistoryModel.create({ userId, musicId, timestamp: new Date() });
    return newHistory;
  }

  async savePlaylistHistory (userId: string, playlistId: string) {
    const playlist = await PlayListModel.findByPk(playlistId);
    if (!playlist) throw new Error('Playlist not found');
    const history = await HistoryModel.findOne({ where: { userId, playlistId } });
    if (history) {
      history?.set({ timestamp: new Date() });
      await history?.save();
      return history;
    }
    const newHistory = await HistoryModel.create({ userId, playlistId, timestamp: new Date() });
    return newHistory;
  }

  async saveAlbumHistory (userId: string, albumId: string) {
    const album = await AlbumModel.findByPk(albumId);
    if (!album) throw new Error('Album not found');
    const history = await HistoryModel.findOne({ where: { userId, albumId } });
    if (history) {
      history?.set({ timestamp: new Date() });
      await history?.save();
      return history;
    }
    const newHistory = await HistoryModel.create({ userId, albumId, timestamp: new Date() });
    return newHistory;
  }
}