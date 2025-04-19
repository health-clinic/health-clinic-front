import { createServer, JSONAPISerializer } from "miragejs"
import routes from "./routes"

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    serializers: {
      application: JSONAPISerializer,
    },
    routes, // ✅ Make sure this is passed
    timing: 750,
  })
}
