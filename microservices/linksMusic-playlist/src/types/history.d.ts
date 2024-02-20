import { Model } from 'sequelize';

export interface IHistory extends Model {
    id: string;
    userId: string;
    musicId: string;
    playlistId: string;
    createdAt: Date;
}