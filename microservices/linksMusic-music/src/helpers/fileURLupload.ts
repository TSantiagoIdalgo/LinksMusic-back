import crypto from 'crypto';
import { IAudioDetails } from '../types/music';
import ytdl from 'ytdl-core';
import axios from 'axios';

export async function fileUrlUpload(id: string, userId: string) {
  const link = `https://www.youtube.com/watch?v=${id}`;
  const uuid = crypto.randomUUID().split('-').join('');
  const audioStream = ytdl(link, { filter: 'audioonly', quality: 'highestaudio' });
  const audioData = await ytdl.getInfo(link);

  const audioFormat = ytdl.chooseFormat(audioData.formats, { quality: 'highestaudio' });
  const response = await axios.head(audioFormat.url, { responseType: 'stream' });
  const sizeBytes = response.headers['content-length'];
  const sizeMegaBytes = sizeBytes / (1024 * 1024);

  if (Math.ceil(sizeMegaBytes) > 10) throw new Error('File size is too large');

  const buffers: Buffer[] = [];
  for await (const chunk of audioStream) {
    buffers.push(chunk);
  }
  const audioBuffer = Buffer.concat(buffers);

  const audioDetails: IAudioDetails = {
    id: uuid,
    name: audioData.videoDetails.title,
    author: audioData.videoDetails.author.user,
    album: audioData.videoDetails.author.name,
    duration: audioData.videoDetails.lengthSeconds,
    image: audioData.videoDetails.thumbnails[0].url,
    userId: userId
  };

  return { audioDetails, audioBuffer };
}
