import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const input: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const output: Motorcycle = new Motorcycle({
  id: '645c081534e4f3e083c27b93',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30,
  category: 'Street',
  engineCapacity: 600,
});

describe('Testa a camada service de motorcycle', function () {
  afterEach(function () {
    sinon.restore();
  }); 
  it('inserindo uma motocicleta com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(output);

    const service = new MotorcycleService();
    const response = await service.insertMotorcycle(input);
    expect(response).to.be.deep.equal(output);
  });

  it('buscando uma motocicleta especifica', async function () {
    sinon.stub(Model, 'findById').resolves(output);

    const service = new MotorcycleService();
    const result = await service.getMotorcycleById('645c081534e4f3e083c27b93');
    expect(result).to.be.deep.equal(output);
  });

  it('busca todas as motocicletas', async function () {
    const manyMotorcyclesOutput = [{ ...output }, { ...output }];
    sinon.stub(Model, 'find').resolves(manyMotorcyclesOutput);

    const service = new MotorcycleService();
    const result = await service.getMotorcycles();
    expect(result).to.be.deep.equal(manyMotorcyclesOutput);
  });

  it('buscando uma motocicleta que não existe!', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const service = new MotorcycleService();
    const response = await service.getMotorcycleById('644a76b413b85a4facd8d42e');
    expect(response).to.equal(null);
  });
});
