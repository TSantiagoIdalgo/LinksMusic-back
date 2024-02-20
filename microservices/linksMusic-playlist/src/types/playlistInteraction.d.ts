import { Model } from 'sequelize';

export interface IPlaylistInteraction extends Model {
    like: boolean;
    dislike: boolean;
    playlistId: string;
    userId: string;
}