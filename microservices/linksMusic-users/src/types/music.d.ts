import { Model } from 'sequelize';
import { 
  BelongsToManyAddAssociationMixin, 
  BelongsToManyGetAssociationsMixin, 
  BelongsToManyRemoveAssociationMixin } from 'sequelize';
import PlayListModel from '../database/models/playlistModel';
export type MusicUUID = `${string}-${string}-${string}-${string}-${string}`

export interface IMusic extends Model {
    id: string;
    name: string;
    author: string;
    album: string;
    duration: number
    tempFilePath?: string;
    image?: string;
    userId: string;
    addPlaylist: BelongsToManyAddAssociationMixin<PlayListModel, 'playlist'>;
    getPlaylists: BelongsToManyGetAssociationsMixin<PlayListModel>;
    removePlaylist: BelongsToManyRemoveAssociationMixin<PlayListModel, 'playlist'>;
}