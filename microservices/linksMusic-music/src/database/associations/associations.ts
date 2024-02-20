import MusicModel from '../tables/musicModel';
import PlayListModel from '../tables/playlistModel';
import UserModel from '../tables/userModel';
import AlbumModel from '../tables/albumModel';

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

UserModel.hasMany(MusicModel, {
  foreignKey: 'userId',
  sourceKey: 'email'
});

MusicModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  targetKey: 'email'
});

AlbumModel.hasMany(MusicModel, { foreignKey: 'album', sourceKey: 'name' });