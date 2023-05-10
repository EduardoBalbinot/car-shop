import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async insertCar(car: ICar) {
    const carOdm = new CarODM();
    const newCar = await carOdm.create(car);
    return this.createCarDomain(newCar);
  }

  public async getCars() {
    const carODM = new CarODM();
    const cars = await carODM.getAll();
    const domainCars = cars.map((c) => this.createCarDomain(c));
    return domainCars;
  }

  public async getCarById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.getById(id);
    const domainCar = this.createCarDomain(car);
    return domainCar;
  }

  public async update(id: string, updatedCar: ICar) {
    const carODM = new CarODM();
    const car = await carODM.update(id, updatedCar);
    const domainCar = this.createCarDomain(car);
    return domainCar;
  }
}

export default CarService;
