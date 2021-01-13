import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import uploadConfig from '@config/upload';
import routers from './routes';
import '../typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routers);

app.listen(3333, () => {
  console.log('🐱‍🏍 Server Started on port 3333');
});
