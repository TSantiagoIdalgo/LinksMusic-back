import sequelize from '../db';
import { DataTypes } from 'sequelize';
import { IMusic } from '../../types/music';

const MusicModel = sequelize.define<IMusic>('music',{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  album: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  }
});

export default MusicModel;