import { IUser, IUserHistory } from '../../types/user';
import UserController from '../../controllers/userController';
import { IToken } from '../../middlewares/token';

const UserResolver = {
  Query: {
    getAllUser: async () => 
      await UserController.getAllUser(),
    getUserById: async (_parent: IUser, args: IUser, context: IToken) =>
      await UserController.getUserById(args.id, context),
    getUserMusic: async (_parent: IUser, _args: IUser, context: IToken) =>
      await UserController.getUserMusic(context),
    getUserHistory: async (_parent: IUserHistory, _args: IUserHistory, context: IToken) =>
      await UserController.getUserHistory(context),
    userLogin: async (_parent: IUser, args: IUser) =>
      await UserController.userLogin(args.email, args.passwordHash),
    userNetworkLogin: async (_parent: IUser, args: IUser) =>
      await UserController.userNetworkLogin(args.userName, args.email, args.image)
  },
  Mutation: {
    createUser: async (_parent: IUser, args: IUser) =>
      await UserController.createUser(args),
    verifyUser: async (_parent: IUser, args: IUser) =>
      await UserController.verifyUser(args.token),
    deleteUser: async (_parent: IUser, args: IUser) =>
      await UserController.deleteUser(args.id),
    updateUser: async (_parent: IUser, args: IUser) =>
      await UserController.updateUser(args)
  }
};

export default UserResolver;