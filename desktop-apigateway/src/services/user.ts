import axios from 'axios';
import { USER_SERVICE } from '../config/api';
import { IUserHistory } from '../types/user';
import { IUser } from '../types/user';
import { IMusic } from '../types/music';

export default class UserService {
  static async getUsers() {
    const { data } = await axios.get<IUser, IUser>(`${USER_SERVICE}/user`);
    return data;
  }

  static async getUser(id: string) {
    const { data } = await axios.get<IUser, IUser>(`${USER_SERVICE}/user/${id}`);
    return data;
  }

  static async getMusic (userId: string) {
    const { data } = await axios.get<IMusic>(`${USER_SERVICE}/user/music/${userId}`);
    return data;
  }

  static async createUser(user: IUser): Promise<IUser> {
    const { data } = await axios.post<IUser, IUser>(`${USER_SERVICE}/user`, user);

    return data;
  }

  static async getHistory(userId: string): Promise<IUserHistory[]> {
    const { data } = await axios.get<IUserHistory[]>(`${USER_SERVICE}/user/history/${userId}`);
    return data;
  }

  static async userLogin (email: string, passwordHash: string): Promise<IUser> {
    const user = {
      email: email,
      passwordHash: passwordHash,
    };
    const { data } = await axios.post<IUser, IUser>(`${USER_SERVICE}/login`, user);
  
    return data;
  }

  static async userNetworkLogin (userName: string, email: string, image: string | null): Promise<string> {
    const user = {
      userName: userName,
      email: email,
      image: image
    };
    const { data } = await axios.post<string>(`${USER_SERVICE}/login/network`, user);
    return data;
  }

  static async updateUser(user: IUser): Promise<IUser> {
    const { data } = await axios.put<IUser, IUser>(`${USER_SERVICE}/user`, user);
    return data;
  }

  static async verifyUser (token: string) {
    const verifiedUser: IUser = await axios.put(`${USER_SERVICE}/user/${token}`);
    return verifiedUser.data;
  }

  static async deleteUser(id: string): Promise<IUser> {
    const { data } = await axios.delete<IUser, IUser>(`${USER_SERVICE}/user/${id}`);
    return data;
  }

}