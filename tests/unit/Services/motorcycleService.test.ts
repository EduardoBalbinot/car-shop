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
  it('inserindo uma motocicleta com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(output);

    const service = new MotorcycleService();
    const response = await service.insertMotorcycle(input);
    expect(response).to.be.deep.equal(output);
  });
});
