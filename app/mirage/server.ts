import { createServer, JSONAPISerializer } from "miragejs"
import routes from "./routes"

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    serializers: {
      application: JSONAPISerializer,
    },
    routes,
    timing: 750,
  })
}
