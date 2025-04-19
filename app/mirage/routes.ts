import { Server } from "miragejs"
import { authRouter } from "./auth"

export default function routes(this: Server) {
  this.namespace = "/api/v1"

  this.passthrough("https://**")
  this.passthrough("http://**")

  authRouter.apply(this)
}
