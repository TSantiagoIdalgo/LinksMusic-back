import { Model } from 'sequelize';

export interface IAlbum extends Model {
    id: string;
    name: string;
    image: string;
    author: string;

}