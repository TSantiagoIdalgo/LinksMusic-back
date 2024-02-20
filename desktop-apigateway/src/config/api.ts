import { config } from 'dotenv';
config();

export const MUSIC_SERVICE = process.env.MUSIC_SERVICE ?? '';
export const USER_SERVICE = process.env.USER_SERVICE ?? '';
export const PLAYLIST_SERVICE = process.env.PLAYLIST_SERVICE ?? '';
export const SEARCH_SERVICE = process.env.SEARCH_SERVICE ?? '';
export const AUTH_SERVICE = process.env.AUTH_SERVICE ?? '';
export const SECRET = process.env.SECRET ?? '';
