export interface IMusic {
    id: string;
    name: string;
    author: string;
    album: string;
    size: number;
    duration: number
    tempFilePath?: string;
    image?: string;
    data: IMusic
  }
export interface IMusicUpdate {
  id: string;
  name: string;
  author: string;
  album: string;
  music: IMusic
}

export interface IMusicInput {
  id: string;
  page: number;
  size: number;
  search: string;
}