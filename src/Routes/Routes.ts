import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

routes.post('/cars', (req, res, next) => new CarController(req, res, next).insertCar());
routes.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getCarById());
routes.get('/cars', (req, res, next) => new CarController(req, res, next).getCars());

export default routes;
