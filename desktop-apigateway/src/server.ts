import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { DocumentNode } from 'graphql';
import { CORS_CONFIG, CORS_UPLOAD_CONFIG } from './config/cors';
import fileUploadRouter from './routes/fileUpload';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 4000;

async function Server (typeDefs: DocumentNode[], resolvers: any) {
  const server = express();

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    csrfPrevention: true,
    cache: 'bounded',
  });

  await apolloServer.start();
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use('/graphql/upload',
    fileUpload({ useTempFiles: false}),
    cors(CORS_UPLOAD_CONFIG),
    fileUploadRouter);
  server.use('/graphql', 
    fileUpload({ useTempFiles: false}),
    cors(CORS_CONFIG),
    expressMiddleware(apolloServer,{
      context: async ({ req }) => ({ token: req.headers.authorization })}));
  server.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}/graphql`));
}

export default Server;
