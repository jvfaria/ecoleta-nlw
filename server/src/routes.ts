import express, { request } from 'express';

import PointsController from './controller/PointsController';
import ItemsController from './controller/ItemsController';

const pc = new PointsController();
const ic = new ItemsController();
const routes = express.Router();

// POSTS
routes.post('/points', pc.create);

// -- - - - - - -- - - - - - - - --

// GETS 
routes.get('/items' , ic.index);
routes.get('/points', pc.index ); 
routes.get('/points/:id', pc.show);


export default routes;