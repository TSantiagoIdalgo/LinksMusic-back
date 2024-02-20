import { Model } from 'sequelize';
import { 
  BelongsToManyAddAssociationMixin, 
  BelongsToManyGetAssociationsMixin, 
  BelongsToManyRemoveAssociationMixin } from 'sequelize';
import MusicModel from '../database/tables/musicModel';

export interface IPlaylistModel extends Model {
  id: string;
  tittle: string;
  description: string;
  userId: string;
  likes: number,
  dislikes: number;
  addMusic: BelongsToManyAddAssociationMixin<MusicModel, 'music'>;
  getMusics: BelongsToManyGetAssociationsMixin<MusicModel>;
  removeMusic: BelongsToManyRemoveAssociationMixin<MusicModel, 'music'>;
}