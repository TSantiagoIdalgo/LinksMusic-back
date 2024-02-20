import UserModel from '../tables/userModel';
import MusicModel from '../tables/musicModel';
import PlayListModel from '../tables/playlistModel';
import HistoryModel from '../tables/historyModel';
import AlbumModel from '../tables/albumModel';

HistoryModel.belongsTo(UserModel, { foreignKey: 'userId', onDelete: 'CASCADE' });
HistoryModel.belongsTo(MusicModel, { foreignKey: 'musicId', onDelete: 'CASCADE' });
HistoryModel.belongsTo(PlayListModel, { foreignKey: 'playlistId', onDelete: 'CASCADE' });
HistoryModel.belongsTo(AlbumModel, { foreignKey: 'albumId', onDelete: 'CASCADE' });

AlbumModel.hasMany(MusicModel, { foreignKey: 'album', sourceKey: 'name' });

MusicModel.belongsToMany(PlayListModel, { 
  through: 'playlist_music',
  foreignKey: 'musicId',
  otherKey: 'playlistId',
  timestamps: false
});
    
PlayListModel.belongsToMany(MusicModel, {
  through: 'playlist_music',
  foreignKey: 'playlistId',
  otherKey: 'musicId',
  timestamps: false
});