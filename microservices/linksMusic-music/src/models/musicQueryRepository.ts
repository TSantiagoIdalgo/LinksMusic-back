import { IMusic } from '../types/music';
import { IAlbum } from '../types/album';
import { Op } from 'sequelize';
import { AWS_BUCKET_NAME } from '../AWS/awsconfig';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { IUser, IUserModel } from '../types/user';
import { verify } from 'jsonwebtoken';
import UserModel from '../database/tables/userModel';
import MusicModel from '../database/tables/musicModel';
import AlbumModel from '../database/tables/albumModel';
import AWSClient from '../AWS/S3/s3';
import ytdl from 'ytdl-core';

export default class MusicQueryRepository {
  async getAll () {
    return await MusicModel.findAll();
  }

  async getPaginate(pageNumber: number, pageSize: number): Promise<IMusic[]> {
    const offset = Math.max(0, (pageNumber - 1) * pageSize);
    
    return await MusicModel.findAll({
      limit: pageSize,
      offset: offset,
      order: [['createdAt', 'DESC']]
    });
  }

  async getMusicByAlbum() {
    return await AlbumModel.findAll({
      limit: 30,
      order: [['createdAt', 'DESC']]
    });
  }

  async getAllMusicByAlbum(album: string): Promise<IAlbum | null> {
    const albumsWithMusic = await AlbumModel.findOne({
      where: { id: album },
      include: [MusicModel]
    });
    
    return albumsWithMusic;
  }

  async getMusicSearch (search: string): Promise<IMusic[]> {
    return await MusicModel.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { album: { [Op.iLike]: `%${search}%` } }
        ]
      },
      limit: 30,
    });
  }

  async getById(id: string): Promise<IMusic | null> {
    const music = await MusicModel.findOne({ where: { id } });
    return music;
  }

  async getMusicByName (name: string): Promise<IMusic | null> {
    return await MusicModel.findOne({
      where: { 
        name: { 
          [Op.iLike]: `%${name}%`} 
      } });
  }

  async getURL (filename: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: `music/${filename}`
    });
    return await getSignedUrl(AWSClient, command, { expiresIn: 3600 });
  }

  async getVideoInfo (url: string) {
    const link = `https://www.youtube.com/watch?v=${url}`;
    const audioData = await ytdl.getInfo(link);
    const audioDetails = {
      name: audioData.videoDetails.title,
      author: audioData.videoDetails.author.user ?? 'Unknow',
      album: audioData.videoDetails.author.name,
      duration: audioData.videoDetails.lengthSeconds,
      image: audioData.videoDetails.thumbnails[0].url,
    };
    return audioDetails;
  }

  async TokenVerify (token: string): Promise<IUser> {
    const tokenSecure = token.split(' ')[1];
    const user = verify(tokenSecure, process.env.SECRET as string) as IUserModel;

    if (!user) throw new Error('Invalid token');
    const userFind = await UserModel.findOne({ where: { email: user.email } });

    if (!userFind) throw new Error('Invalid token');
    return userFind;
  }
}