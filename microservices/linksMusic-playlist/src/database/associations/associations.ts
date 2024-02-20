import UserModel from '../tables/userModel';
import PlayListModel from '../tables/playlistModel';
import MusicModel from '../tables/musicModel';
import PlaylistInteractionModel from '../tables/playlistInteraction';


UserModel.hasMany(PlayListModel, {
  foreignKey: 'userId',
  sourceKey: 'email'
});
  
PlayListModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  targetKey: 'email'
});
  
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

PlayListModel.belongsToMany(UserModel, { 
  through: PlaylistInteractionModel, 
  foreignKey: 'playlistId', 
  otherKey: 'userId' 
});

UserModel.belongsToMany(PlayListModel, {
  through: PlaylistInteractionModel,
  foreignKey: 'userId',
  otherKey: 'playlistId'
});

UserModel.hasMany(MusicModel, {
  foreignKey: 'userId',
  sourceKey: 'email'
});

MusicModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  targetKey: 'email'
});