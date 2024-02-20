import sequelize from '../db';
import { DataTypes } from 'sequelize';
import { IHistory } from '../../types/history';

const HistoryModel = sequelize.define<IHistory>('history', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  playlistId: {
    type: DataTypes.UUID,
  },
  musicId: {
    type: DataTypes.UUID,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, { timestamps: false });

export default HistoryModel;