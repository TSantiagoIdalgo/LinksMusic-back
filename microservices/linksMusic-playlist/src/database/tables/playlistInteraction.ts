import sequelize from '../db';
import { DataTypes } from 'sequelize';
import { IPlaylistInteraction } from '../../types/playlistInteraction';

const PlaylistInteractionModel = sequelize.define<IPlaylistInteraction>('PlaylistInteraction', {
  like: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  dislike: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

export default PlaylistInteractionModel;