import sequelize from '../db';
import { DataTypes } from 'sequelize';
import { IAlbum } from '../../types/album';

const AlbumModel = sequelize.define<IAlbum>('album', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  }
});

export default AlbumModel;