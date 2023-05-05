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
}

export default CarService;
