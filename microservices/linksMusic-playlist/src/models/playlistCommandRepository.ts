import { IPlaylistModel, TPlaylistAction } from '../types/playlist';
import sequelize from '../database/db';
import PlayListModel from '../database/tables/playlistModel';
import HistoryModel from '../database/tables/historyModel';
import MusicModel from '../database/tables/musicModel';
import PlaylistInteractionModel from '../database/tables/playlistInteraction';

export default class PlaylistCommandRepository {
    
  async create (playlist: IPlaylistModel) {
    return await PlayListModel.create({
      tittle: playlist.tittle,
      description: playlist.description,
      userId: playlist.userId,
    });
  }

  async update (id: string, playlist: IPlaylistModel) {
    const playlistUpdated = await PlayListModel.findByPk(id);
    playlistUpdated?.set(playlist);
    playlistUpdated?.save();
    return playlistUpdated;
  }

  async delete (id: string) {
    const playlist = await PlayListModel.findByPk(id);
    await HistoryModel.destroy({
      where: {
        playlistId: id
      }
    });
    await PlayListModel.destroy({
      where: {
        id: id
      }
    });
    return playlist;
  }

  async addPlaylist (musicId: string, playlistId: string) {
    const music = await MusicModel.findByPk(musicId);
    const playlist = await PlayListModel.findByPk(playlistId);
    if (music && playlist) {
      await playlist?.addMusic(music);
      return music;
    }
    return null;
  }

  async removeFromPlaylist (musicId: string, playlistId: string) {
    const music = await MusicModel.findByPk(musicId);
    const playlist = await PlayListModel.findByPk(playlistId);
    if (music && playlist) {
      await playlist?.removeMusic(music);
      return music;
    }
    return music;
  }

  async updateLikes (playlistId: string, userId: string, action: TPlaylistAction) {
    const t = await sequelize.transaction();
    try {
      const playlist = await PlayListModel.findByPk(playlistId, { transaction: t });
      if (!playlist) throw new Error('Playlist not found');

      let interaction = await PlaylistInteractionModel.findOne({
        where: { playlistId: playlistId, userId: userId },
        transaction: t,
      });

      if (!interaction) {
        interaction = await PlaylistInteractionModel.create({
          playlistId: playlistId,
          userId: userId,
          like: false,
          dislike: false
        }, { transaction: t });
      }

      if (action === 'likes' && !interaction.like) {
        await playlist.increment('likes', { by: 1, transaction: t });
        if (playlist.dislikes > 0) await playlist.decrement('dislikes', { by: 1, transaction: t });
        await interaction.update({
          like: true,
          dislike: false
        }, { transaction: t });
      }
      if (action === 'dislikes' && !interaction.dislike) {
        await playlist.increment('dislikes', { by: 1, transaction: t });
        if (playlist.likes > 0) await playlist.decrement('likes', { by: 1, transaction: t });
        await interaction.update({
          like: false,
          dislike: true
        }, { transaction: t });
      }

      await t.commit();
      
      return interaction;
    } catch (error) {
      t.rollback();
      throw new Error(error.message);
    }
  }
}