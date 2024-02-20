import { Model } from 'sequelize';
import { IPlaylist } from './playlist';
import { IMusic } from './music';
import { IAlbum } from './album';

export interface IUser {
    id: string
    userName: string
    email: string
    passwordHash: string
    token?: string
    verify?: boolean
    image: string | null
    data: IUser
}

export interface IUserHistory {
    id: string
    userId: string
    musicId: string
    playlistId: string
    music?: IMusic[]
    playlist?: IPlaylist
    album?: IAlbum
    timestamp: Date
}

export interface IHistory {
    userId: string;
    playlistId: string | undefind;
    musicId: string | undefined;
    albumId: string | undefined
}



export interface IUserModel extends Model<IUser>, IUser {}