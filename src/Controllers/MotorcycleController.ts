import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcicleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcicleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcicleService();
  }

  public async insertMotorcycle() {
    const motorcycle: IMotorcycle = this.req.body;
    try {
      const newMotorcycle = await this.service.insertMotorcycle(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotorcycles() {
    const motorcycles = await this.service.getMotorcycles();
    return this.res.status(200).json(motorcycles);
  }

  public async getMotorcycleById() {
    try {
      const { id } = this.req.params;
      const motorcycle = await this.service.getMotorcycleById(id);
      if (!motorcycle) return this.res.status(404).json({ message: 'Motorcycle not found' });
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    try {
      const { id } = this.req.params;
      const updatedMotorcycle = this.req.body;
      const motorcycle = await this.service.getMotorcycleById(id);
      if (!motorcycle) return this.res.status(404).json({ message: 'Motorcycle not found' });
      const response = await this.service.update(id, updatedMotorcycle);
      return this.res.status(200).json(response);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;
