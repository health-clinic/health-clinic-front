import { Server } from 'miragejs';
import loginRouter from './login';
import registerRouter from './register';

export default function routes(this: Server) {
    this.namespace = 'api';
    this.timing = 750;

    this.passthrough('https://**');
    this.passthrough('http://**');
    
    loginRouter.apply(this);
    registerRouter.apply(this);
}