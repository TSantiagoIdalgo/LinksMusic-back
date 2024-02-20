import { IPlaylistModel } from '../types/playlist';
import PlayListModel from '../database/tables/playlistModel';
import MusicModel from '../database/tables/musicModel';
import PlaylistInteractionModel from '../database/tables/playlistInteraction';
import UserModel from '../database/tables/userModel';

export default class PlaylistQueryRepository {
  async getAll () {
    return await PlayListModel.findAll({
      order: [['likes', 'DESC']]
    });
  }
    
  async getPaginate(pageNumber: number, pageSize: number): Promise<IPlaylistModel[]> {
    const offset = Math.max(0, (pageNumber - 1) * pageSize);
        
    return await PlayListModel.findAll({
      limit: pageSize,
      offset: offset,
      order: [['likes', 'DESC']],
      include: [{
        model: MusicModel,
        required: true
      }]
    });
  }
    
  async getById (id: string) {
    return await PlayListModel.findByPk(id);
  }
      
  async getByUser (id: string) {
    const playlist = await PlayListModel.findAll({
      where: {
        userId: id
      },
      include: [MusicModel]
    });
    return playlist;
  }
    
  async getMusic (id: string) {
    const playlist = await PlayListModel.findOne({
      where: {
        id: id
      },
      include: [MusicModel]
    });
    return playlist;
  }
  
  async getLikes (playlistId: string) {
    const likes = await PlaylistInteractionModel.findAll({
      where: { playlistId }
    });

    const users = await Promise.all(likes.map((like) => {
      return UserModel.findByPk(like.userId);
    }));
    return users;
  }

  async getUserLikes (userId: string, playlistId: string) {
    return await PlaylistInteractionModel.findOne({
      where: { userId, playlistId }
    });
  }
}