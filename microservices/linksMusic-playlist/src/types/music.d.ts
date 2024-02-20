import { Model } from 'sequelize';
import { 
  BelongsToManyAddAssociationMixin, 
  BelongsToManyGetAssociationsMixin, 
  BelongsToManyRemoveAssociationMixin } from 'sequelize';
import PlayListModel from '../database/tables/playlistModel';

export interface IMusicModel extends Model{
  id: string;
  name: string;
  author: string;
  album: string;
  size: number;
  duration: number
  tempFilePath?: string;
  image?: string;
  addPlaylist: BelongsToManyAddAssociationMixin<PlayListModel, 'playlist'>;
  getPlaylists: BelongsToManyGetAssociationsMixin<PlayListModel>;
  removePlaylist: BelongsToManyRemoveAssociationMixin<PlayListModel, 'playlist'>;
}