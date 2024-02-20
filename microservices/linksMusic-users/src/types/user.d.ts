import { Model } from 'sequelize';

type TUserId = `${string}-${string}-${string}-${string}-${string}`

export interface IUser {
    id: UserId
    userName: string
    email: string;
    passwordHash: string
    token?: string
    verify?: boolean
    image: string | null
}

export interface IUserModel extends Model<IUser>, IUser {}