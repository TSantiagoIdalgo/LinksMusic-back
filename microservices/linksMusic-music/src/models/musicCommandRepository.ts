import { IAudioDetails, IMusic } from '../types/music';
import { Sequelize, Op } from 'sequelize';
import { AWS_BUCKET_NAME } from '../AWS/awsconfig';
import { createReadStream, unlinkSync } from 'fs';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { IAudioMetadata } from 'music-metadata';
import sequelize from '../database/db';
import MusicModel from '../database/tables/musicModel';
import AlbumModel from '../database/tables/albumModel';
import AWSClient from '../AWS/S3/s3';
import crypto from 'crypto';

export default class MusicCommandRepository {

  async create(file: IMusic, userId: string, metadata: IAudioMetadata): Promise<IMusic> {
    const stream = createReadStream(file.tempFilePath as string);
    const uuid = crypto.randomUUID().split('-').join('');
    const music = await sequelize.transaction(async (t) => {
      const music = await MusicModel.create({
        id: uuid,
        name: metadata.common.title ?? file.name,
        author: metadata.common.artist ?? 'Unknow',
        album: metadata.common.album ?? 'Unknow',
        duration: metadata.format.duration,
        userId: userId
      }, { transaction: t });

      const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: `music/${uuid}.mp3`,
        Body: stream
      };
      const command = new PutObjectCommand(params);
      await AWSClient.send(command);
      
      return music;
    });
    
    await this.createAlbums();
    unlinkSync(file.tempFilePath as string);
        
    return music;
  }
    
  async createByUrl (userId: string, audioDetails: IAudioDetails, audioBuffer: Buffer) {
    const music = await sequelize.transaction(async (t) => {
      const createdMusic = await MusicModel.create({
        id: audioDetails.id,
        name: audioDetails.name,
        author: audioDetails.author,
        album: audioDetails.album,
        duration: audioDetails.duration,
        image: audioDetails.image,
        userId: userId
      }, { transaction: t });
    
      const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: `music/${audioDetails.id}.mp3`,
        Body: audioBuffer
      };
      const command = new PutObjectCommand(params);
      await AWSClient.send(command);
      return createdMusic;
    });
    await this.createAlbums();
    
    return music;
  }
    
  async delete(id: string) {
    const musicId = id.split('-').join('');
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: `music/${musicId}.mp3`
    };
    const command = new DeleteObjectCommand(params);
    await MusicModel.destroy({ where: { id }});
    await AWSClient.send(command);
  }
    
  private async createAlbums() {
    const albumCounts = await MusicModel.findAll({
      attributes: [
        'album',
        [Sequelize.fn('COUNT', Sequelize.col('album')), 'count']
      ],
      group: ['album'],
      having: Sequelize.literal('COUNT("album") > 3'),
    });
    
    for (const music of albumCounts) {
      const minImage = await MusicModel.min('image', {
        where: { album: music.album, image: { [Op.not]: null } },
      });
    
      await AlbumModel.findOrCreate({
        where: { name: { [Op.iLike]: music.album } },
        defaults: {
          name: music.album,
          author: music.author,
          image: minImage,
        }
      });
    }
  }
}