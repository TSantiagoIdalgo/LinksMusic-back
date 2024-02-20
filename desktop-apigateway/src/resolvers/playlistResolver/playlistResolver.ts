import { IPlaylist, IPlaylistMusicAction, IPlaylistInteraction, IPlaylistPaginate } from '../../types/playlist';
import { IToken } from '../../middlewares/token';
import PlaylistController from '../../controllers/playlist';

const playlistResolver = {
  Query: {
    getAllPlaylist: async (_root: IPlaylistPaginate, args: IPlaylistPaginate) =>
      await PlaylistController.getAllPlaylist(args.size, args.page),
    getPlaylistById: async (_root: IPlaylist, args: IPlaylist) =>
      await PlaylistController.getPlaylistById(args.id),
    getUserPlaylist: async (_root: IPlaylist, _args: IPlaylist, context: IToken ) =>
      await PlaylistController.getUserPlaylist(context),
    getPlaylistMusic: async (_root: IPlaylist, args: IPlaylist, context: IToken) =>
      await PlaylistController.getPlaylistMusic(args.id, context),
    getPlaylistLikes: async (_root: IPlaylist, args: IPlaylist) =>
      await PlaylistController.getPlaylistLikes(args.id),
    getUserLikes: async (_root: IPlaylist, args: IPlaylist, context: IToken) =>
      await PlaylistController.getUserLikes(args.id, context),
  },
  Mutation: {
    createPlaylist: async (_root: IPlaylist, args: IPlaylist, context: IToken) =>
      await PlaylistController.createPlaylist(args.data, context),
    addMusicToPlaylist: async (_root: IPlaylistMusicAction, args: IPlaylistMusicAction) =>
      await PlaylistController.addMusicToPlaylist(args.musicId, args.playlistId),
    removeMusicFromPlaylist: async (_root: IPlaylistMusicAction, args: IPlaylistMusicAction) =>
      await PlaylistController.removeMusicFromPlaylist(args.musicId, args.playlistId),
    updatePlaylist: async (_root: IPlaylist, args: IPlaylist) =>
      await PlaylistController.updatePlaylist(args.id, args.data),
    deletePlaylist: async (_root: IPlaylist, args: IPlaylist, context: IToken) =>
      await PlaylistController.deletePlaylist(args.id, context),
    updateLikes: async (_root: IPlaylistInteraction, args: IPlaylistInteraction, context: IToken) =>
      await PlaylistController.interactionPlaylist(args.playlistId, args.action, context)
  }
};

export default playlistResolver;