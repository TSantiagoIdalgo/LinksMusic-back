import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import queryRouter from './routes/queryRouter';
import commandRouter from './routes/commandRouter';

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

server.use('/', queryRouter);
server.use('/', commandRouter);

export default server;