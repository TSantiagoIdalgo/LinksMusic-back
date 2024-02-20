import { IUserModel, IUser } from '../types/user';
import UserModel from '../database/tables/userModel';
import HistoryModel from '../database/tables/historyModel';
import MusicModel from '../database/tables/musicModel';
import AlbumModel from '../database/tables/albumModel';
import PlayListModel from '../database/tables/playlistModel';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';

export default class UserQueryRepository {
  async getAll (): Promise<IUserModel[]> {
    const users = await UserModel.findAll();
    return users;
  }
    
  async getById (id: string): Promise<IUserModel | null> {
    const user = await UserModel.findByPk(id);
    return user;
  }

      
  async login (email: string, password: string): Promise<IUser> {
    const user = await UserModel.findOne({
      where: {
        email,
        verify: true
      }
    });
    
    if (!user) throw new Error('Invalid user or password');
    
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.dataValues.passwordHash);

    if (!passwordCorrect) throw new Error('Invalid user or password');
    const userToken = {
      name: user?.dataValues.userName,
      email: user?.dataValues.email
    };

    const token = Jwt.sign(userToken, process.env.SECRET as string);
    return { ...user?.dataValues, token };
  }

  async networkLogin (userName: string, email: string, image: string) {
    const userFind = await UserModel.findOne({ where: { email: email } });
    const pwd = crypto.randomUUID();
    const userToken = {
      userName,
      email
    };

    const token = Jwt.sign(userToken, process.env.SECRET as string);

    if (userFind === null) {
      await UserModel.create({
        userName,
        email,
        passwordHash: pwd,
        image
      });
    }

    return token;

  }

  getUserMusic (userId: string) {
    return MusicModel.findAll({
      where: { userId }
    });
  }

  async getUserHistory (userId: string) {
    const user = await UserModel.findByPk(userId);
    if (!user) throw new Error('User not found');
    const history = await HistoryModel.findAll({
      where: { userId },
      include: [
        { model: MusicModel },
        {
          model: PlayListModel,
          include: [MusicModel]
        },
        { model: AlbumModel }
      ],
      limit: 30,
      order: [['timestamp', 'DESC']],
    });

    return { user, history };
  }
}