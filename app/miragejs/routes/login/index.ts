import { faker } from '@faker-js/faker';
import { Response, Server } from 'miragejs';

function loginRouter(this: Server) {
  this.post('login', (_schema, request) => {
    const { email, password } = JSON.parse(request.requestBody);

    if (email === '::email::' && password === '::password::') {
      return new Response(422, {}, {
        errors: [{ message: 'E-mail ou senha incorretos.' }]
      });
    }

    return new Response(200, {}, {
      token: '::token::',
      user: {
        name: faker.person.fullName(),
        type: 'Patient'
      }
    });
  });
}

export default loginRouter;