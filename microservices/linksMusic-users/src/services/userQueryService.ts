import UserQueryRepository from '../models/userQueryRepository';
import ErrorService from '../helper/errorHandle';

export default class UserQueryService {
  private readonly userQuery: UserQueryRepository;
    
  constructor(userQuery: UserQueryRepository) {
    this.userQuery = userQuery;
  }

  async getAlluser () {
    return this.userQuery.getAll();
  }

  async getUserById (id: string) {
    try {
      if (!id) throw new Error('Invalid id');
      const user = await this.userQuery.getById(id);
      if (!user) throw new Error('User not found');
      return user; 
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async userLogin (email: string, password: string) {
    try {
      if (!email || !password) throw new Error('Invalid email or password');
      const user = await this.userQuery.login(email, password);
      if (!user) throw new Error('User not found');
      return user; 
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async userNetworkLogin (userName: string, email: string, image: string) {
    try {
      if (!userName || !email || !image) throw new Error('Invalid userName, email or image');
      const user = await this.userQuery.networkLogin(userName, email, image);
      if (!user) throw new Error('User not found');
      return user; 
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  getUserMusic (userId: string) {
    try {
      if (!userId) throw new Error('Invalid userId');
      return this.userQuery.getUserMusic(userId);
    } catch (error) {
      throw new ErrorService(error.message);
    }
  }

  async getUserHistory (userId: string) {
    try {
      if (!userId) throw new Error('Invalid userId');
      const user = await this.userQuery.getUserHistory(userId);
      if (user.history.length === 0) throw new Error('History not found');
      return user;
    } catch (error) {
      throw new ErrorService(error.message);
    } 
  }
}