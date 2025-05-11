import { AxiosInstance } from "axios"
import { authenticationRouter } from "@/interceptors/authentication"
import { appointmentRouter } from "@/interceptors/appointment"

export const routes = (interceptor: AxiosInstance): void => {
  authenticationRouter(interceptor)
  appointmentRouter(interceptor)
}
