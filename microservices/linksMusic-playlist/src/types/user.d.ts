import { Model } from 'sequelize';

export interface IUser extends Model{
    id?: string
    userName: string
    email: string
    passwordHash: string
    image: string;
    token?: string
    verify?: boolean
}