import { Server } from "miragejs"
import { appointmentRouter } from "./appointment"
import { authenticationRouter } from "./authentication"

export default function routes(this: Server) {
  this.namespace = "/api/v1"

  this.passthrough("https://**")
  this.passthrough("http://**")

  authenticationRouter.apply(this)
  appointmentRouter.apply(this)
}
