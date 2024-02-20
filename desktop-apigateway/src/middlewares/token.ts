import jwt from 'jsonwebtoken';
import { IUser } from '../types/user';
import { SECRET } from '../config/api';
import { GraphQLError } from 'graphql';

export interface IToken {
    tokenVerify(): string
    token: string
}

export const tokenVerify = (token: string | undefined) => {
  if (!token) {
    throw new GraphQLError('An authentication token was not provided', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  if (!token.toLowerCase().startsWith('bearer ')) {
    throw new GraphQLError('Invalid authentication token', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  const authorizationHeader = token.slice(7);
  try {
    const decoded = jwt.verify(authorizationHeader, SECRET) as IUser;
    return { user: decoded.email };
  } catch (error) {
    throw new GraphQLError('Invalid authentication token', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
};