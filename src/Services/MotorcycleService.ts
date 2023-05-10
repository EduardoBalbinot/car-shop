import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async insertMotorcycle(newMotorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const response = await motorcycleODM.create(newMotorcycle);
    const motorcycle = this.createMotorcycleDomain(response);
    return motorcycle;
  }

  public async getMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const cars = await motorcycleODM.getAll();
    const domainMotorcycles = cars.map((m) => this.createMotorcycleDomain(m));
    return domainMotorcycles;
  }

  public async getMotorcycleById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.getById(id);
    const domainMotorcycle = this.createMotorcycleDomain(motorcycle);
    return domainMotorcycle;
  }
}

export default MotorcycleService;
