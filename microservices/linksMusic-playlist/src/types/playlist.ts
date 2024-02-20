import { Model } from 'sequelize';
import { 
  BelongsToManyAddAssociationMixin, 
  BelongsToManyGetAssociationsMixin, 
  BelongsToManyRemoveAssociationMixin } from 'sequelize';
import { IMusicModel } from './music';

export type TPlaylistAction = 'likes' | 'dislikes'

export interface IPlaylistModel extends Model {
  id: string;
  tittle: string;
  description: string;
  userId: string;
  likes: number;
  dislikes: number;
  addMusic: BelongsToManyAddAssociationMixin<IMusicModel, 'music'>;
  getMusics: BelongsToManyGetAssociationsMixin<IMusicModel>;
  removeMusic: BelongsToManyRemoveAssociationMixin<IMusicModel, 'music'>;
}