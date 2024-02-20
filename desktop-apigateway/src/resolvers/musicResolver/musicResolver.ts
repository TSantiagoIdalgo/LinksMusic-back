import MusicController from '../../controllers/musicController';
import { IMusic, IMusicInput } from '../../types/music';
import { IToken } from '../../middlewares/token';

const MusicResolver = {
  Query: {
    getPaginateMusic: async (_root: IMusicInput, args: IMusicInput) => 
      await MusicController.getPaginateMusic(args.page, args.size),
    getMusicByAuthor: async () =>
      await MusicController.getMusicByAuthor(),
    getAllMusicByAuthor: async (_root: IMusic, args: IMusic, context: IToken) =>
      await MusicController.getAllMusicByAuthor(args.album, context),
    getMusicSearch: async (_root: IMusicInput, args: IMusicInput) =>
      await MusicController.getMusicSearch(args.search),
    getMusicById: async (_root: IMusic, args: IMusic) =>
      await MusicController.getMusicById(args.id),
    getMusicURL: async (_root: IMusic, args: IMusic, context: IToken) =>
      await MusicController.getMusicURL(args.id, context),
    getMusicInfo: async (_root: IMusic, args: IMusic ) =>
      await MusicController.getMusicInfo(args.id),
  },
  Mutation: {
    postMusicByUrl: async (_root: IMusic, args: IMusic, context: IToken) =>
      await MusicController.postMusicByUrl(args.id, context),
    deleteMusic: async (_root: IMusic, args: IMusic, context: IToken) =>
      await MusicController.deleteMusic(args.id, context)
  }
};

export default MusicResolver;