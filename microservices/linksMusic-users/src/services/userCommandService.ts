import { IUser } from '../types/user';
import UserCommandRepository from '../models/userCommandRepository';
import ErrorService from '../helper/errorHandle';

export default class UserCommandService {
  private readonly userCommand: UserCommandRepository;

  constructor(userCommand: UserCommandRepository) {
    this.userCommand = userCommand;
  }

  async createUser (user: IUser) {
    try {
      if (!user.email || !user.passwordHash || !user.userName) throw new Error('Missing data');
      return await this.userCommand.create(user);
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async updateUser (user: IUser ) {
    try {
      if (!user.email) throw new Error('Missing data');
      const userUpdated = await this.userCommand.update(user);
      if (!userUpdated) throw new Error('User not found');
      return userUpdated;
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async deleteUser (id: string) {
    try {
      if (!id) throw new Error('Missing data');
      const userDeleted = await this.userCommand.delete(id);
      if (!userDeleted) throw new Error('User not found');
      return userDeleted; 
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async userVerify (token: string) {
    try {
      if (!token) throw new Error('Missing data');
      return await this.userCommand.verify(token);
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async saveMusicHistory (userId: string, musicId: string) {
    try {
      if (!userId || !musicId) throw new Error('Missing data');
      return await this.userCommand.saveMusicHistory(userId, musicId); 
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async savePlaylistHistory (userId: string, playlistId: string) {
    try {
      if (!userId || !playlistId) throw new Error('Missing data');
      return await this.userCommand.savePlaylistHistory(userId, playlistId);
    } catch (error) {
      throw new ErrorService(error.message);   
    }
  }

  async saveAlbumHistory (userId: string, albumId: string) {
    try {
      if (!userId || !albumId) throw new Error('Missing data');
      return await this.userCommand.saveAlbumHistory(userId, albumId);
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }
}