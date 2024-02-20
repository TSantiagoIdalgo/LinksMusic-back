import { Model } from 'sequelize';

export interface IUser {
    id?: string
    userName: string
    email: string
    passwordHash: string
    token?: string
    verify?: boolean
    image: string
}

export interface IUserModel extends Model<IUser>, IUser {}