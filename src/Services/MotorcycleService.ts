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
}

export default MotorcycleService;
