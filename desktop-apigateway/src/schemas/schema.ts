import { gql } from 'graphql-tag';
import UserSchema from './userSchema/userSchema';
import musicSchema from './musicSchema/musicSchema';
import playlistSchema from './playlistSchema/playlistSchema';

const rootSchema = gql`
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
`;

export const typeDefs = [rootSchema, UserSchema, musicSchema, playlistSchema];