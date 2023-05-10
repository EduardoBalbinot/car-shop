import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

routes.post('/cars', (req, res, next) => new CarController(req, res, next).insertCar());
routes.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getCarById());
routes.get('/cars', (req, res, next) => new CarController(req, res, next).getCars());
routes.put('/cars/:id', (req, res, next) => new CarController(req, res, next).update());

routes.post('/motorcycles', (req, res, next) => new MotorcycleController(req, res, next)
  .insertMotorcycle());

routes.get('/motorcycles', (req, res, next) => new MotorcycleController(req, res, next)
  .getMotorcycles());

routes.get('/motorcycles/:id', (req, res, next) => new MotorcycleController(req, res, next)
  .getMotorcycleById());
export default routes;
