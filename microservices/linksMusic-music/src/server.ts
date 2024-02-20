import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import commandRouter from './routes/commandRouter';
import queryRouter from './routes/queryRouter';

const server = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

server.use(morgan('dev'));
server.use(express.json());
server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));

server.use(fileUpload({ useTempFiles: true, tempFileDir: './src/uploads' }));

server.use('/', commandRouter);
server.use('/', queryRouter);

export default server;