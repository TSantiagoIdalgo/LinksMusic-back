import { gql } from 'graphql-tag';

const UserSchema = gql`
    type User {
        id: ID!
        userName: String!
        email: String!
        passwordHash: String!
        token: String
        image: String
        verify: Boolean!
    }

    type Album {
        id: String
        name: String
        image: String
        author: String
        music: [Music]
    }

    type History {
        id: ID!
        userId: String!
        playlistId: String
        musicId: String
        albumId: String
        timestamp: String!
        music: Music
        playlist: Playlist
        album: Album
    }

    type UserHistory {
        user: User!
        history: [History]!
    }

    input UserInput {
        userName: String!
        email: String!
        passwordHash: String!
    }

    extend type Query {
        getAllUser: [User]
        getUserById(id: ID): User
        getUserMusic: [Music]
        getUserHistory: UserHistory
        userLogin(email: String!, passwordHash: String!): User
        userNetworkLogin(userName: String!, email: String!, image: String!): String!
    }

    extend type Mutation {
        createUser(userName: String!, email: String!, passwordHash: String!): User
        verifyUser(token: String!): User
        deleteUser(id: ID!): User
        updateUser(email: String!, userName: String, passwordHash: String): User
    }
`;

export default UserSchema;