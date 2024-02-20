import UserService from '../services/user';
import { GraphQLError } from 'graphql';
import { IUser } from '../types/user';
import { tokenVerify } from '../middlewares/token';
import { IToken } from '../middlewares/token';

export default class UserController {
  static async getAllUser () {
    try {
      const user = await UserService.getUsers();
      return user;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getUserById (id: string, context: IToken) {
    const { token } = context;
    try {
      const { user } = tokenVerify(token);
      if (user) return await UserService.getUser(user); 
      else return await UserService.getUser(id);
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getUserMusic (context: IToken) {
    const { token } = context;
    try {

      if (!token) throw new GraphQLError('Token is undefined', {
        extensions: { code: 'UNAUTHENTICATED' }
      });
      const { user } = tokenVerify(token);
      if (!user) throw new GraphQLError('Invalid authentication token', {
        extensions: { code: 'UNAUTHENTICATED' },
      });

      const userFind = await UserService.getMusic(user);
      return userFind;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async getUserHistory (context: IToken) {
    const { token } = context;
    try {

      if (!token) throw new GraphQLError('Token is undefined', {
        extensions: { code: 'UNAUTHENTICATED' }
      });
      const { user } = tokenVerify(token);
      if (!user) throw new GraphQLError('Invalid authentication token', {
        extensions: { code: 'UNAUTHENTICATED' },
      });

      const userFind = await UserService.getHistory(user);
      return userFind;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async createUser (user: IUser) {
    try {
      const newUser = await UserService.createUser(user);
      return newUser;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async updateUser (user: IUser) {
    try {
      const updatedUser = await UserService.updateUser(user);
      return updatedUser;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async userLogin (email: string, passwordHash: string) {
    try {
      const user = await UserService.userLogin(email, passwordHash);
      return user;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async userNetworkLogin (userName: string, email: string, image: string | null) {
    try {
      return await UserService.userNetworkLogin(userName, email, image);
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async verifyUser (token: string | undefined) {
    try {
      if (!token) throw new GraphQLError('Token not found', {
        extensions: { code: 'BAD_TOKEN_INPUT' }
      });
      const user = await UserService.verifyUser(token);
      return user;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }

  static async deleteUser (id: string) {
    try {
      const user = await UserService.deleteUser(id);
      return user;
    } catch (error) {
      const message: string = error.response?.data?.error || error.message;
      throw new GraphQLError(message, {
        extensions: { code: error.code || error.extensions.code }
      });
    }
  }
}