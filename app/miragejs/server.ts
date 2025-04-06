import { createServer, JSONAPISerializer } from "miragejs"

import routes from './routes'

const config = (environment: string) => {
  const configObj = {
    serializers: {
      application: JSONAPISerializer.extend({
        serialize(response: any, request: any) {
          const json = JSONAPISerializer.prototype.serialize.apply(
            this,
            // eslint-disable-next-line prefer-rest-params
            arguments as any
          );

          return json;
        }
      })
    },
    environment,
    routes,
    fixtures: null,
    timing: 750
  }

  return configObj
};

  export default function makeServer ({ environment = 'development' } = {}) {
    return createServer(config(environment))
}