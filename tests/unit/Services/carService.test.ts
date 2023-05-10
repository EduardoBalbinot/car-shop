import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';

const input: ICar = {
  model: 'Marea normal',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const output: Car = new Car({
  id: '645a76b413b85a4facd8d42e',
  model: 'Marea normal',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
});

describe('Testa a camada service de car', function () {
  afterEach(function () {
    sinon.restore();
  }); 
  it('buscando um carro especifico', async function () {
    sinon.stub(Model, 'findById').resolves(output);

    const service = new CarService();
    const result = await service.getCarById('645a76b413b85a4facd8d42e');
    expect(result).to.be.deep.equal(output);
  });

  it('busca todos os carros', async function () {
    const manyCarsOutput = [{ ...output }, { ...output }];
    sinon.stub(Model, 'find').resolves(manyCarsOutput);

    const service = new CarService();
    const result = await service.getCars();
    expect(result).to.be.deep.equal(manyCarsOutput);
  });

  it('buscando um carro com id invalido', async function () {
    sinon.stub(Model, 'findById').resolves(output);

    try {
      const service = new CarService();
      await service.getCarById('1');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('buscando um carro que não existe', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const service = new CarService();
    const response = await service.getCarById('644a76b413b85a4facd8d42e');
    expect(response).to.equal(null);
  });

  it('inserindo um carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(output);

    const service = new CarService();
    const result = await service.insertCar(input);
    expect(result).to.be.deep.equal(output);
  });
});
