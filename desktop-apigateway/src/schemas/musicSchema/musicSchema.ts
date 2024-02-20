import { gql } from 'graphql-tag';

const musicSchema = gql`
    type Music {
        id: String
        name: String
        author: String
        album: String
        size: Int
        duration: Float
        image: String
        userId: String
    }

    type MusicAuthors {
        id: ID!
        name: String!
        author: String!
        image: String!
        music: [Music]
    }

    input MusicInput {
        name: String
        author: String
        album: String
    }


    extend type Query {
        getPaginateMusic(page: Int, size: Int): [Music]
        getMusicByAuthor: [MusicAuthors]
        getAllMusicByAuthor(album: String!): MusicAuthors
        getMusicSearch(search: String): [Music]
        getMusicById(id: String): Music
        getMusicURL(id: String): String
        getMusicInfo(id: String): Music
    }

    extend type Mutation {
        postMusicByUrl(id: String): Music
        deleteMusic(id: String): Music
    }
`;

export default musicSchema;