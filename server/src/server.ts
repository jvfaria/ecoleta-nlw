import express, { query } from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(routes);
app.use(cors())
app.use('/tmp', express.static(path.resolve(__dirname, '..' ,'tmp')));

app.listen(3333);


