import { faker } from '@faker-js/faker';
import { Response } from 'miragejs';

function maybeGenerateField (generatorFunction, probability = 1) {
  return Math.random() < probability ? generatorFunction() : null;
}

function registerRouter () {
  this.post('/register', (_schema, _server) => {
    return new Response(201, {}, {
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        document: maybeGenerateField(() => faker.helpers.arrayElement([
          '66379588086',
          '99024172055',
          '65769040025',
          '90934459010'
        ])),
        phone: faker.random.numeric(11),
        birthdate: maybeGenerateField(() => faker.date.past(20).toISOString().split('T')[0]),
        address: {
          zip_code: faker.address.zipCode(),
          street: faker.address.streetName(),
          number: faker.random.numeric(3),
          complement: faker.random.word(),
          district: faker.address.streetName()
        },
        type: 'Patient'
      },
      token: '::token::'
    });
  });
}

export default registerRouter;