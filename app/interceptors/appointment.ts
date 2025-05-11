import { faker } from "@faker-js/faker"
import { RequestController } from "@mswjs/interceptors"
import { AxiosInstance, InternalAxiosRequestConfig } from "axios"

type HttpRequestEventMap = {
  request: Request
  requestId: string
  controller: RequestController
}

enum Status {
  Pending = "pending",
  Confirmed = "confirmed",
  Completed = "completed",
  Canceled = "canceled",
}

export const appointmentRouter = (interceptor: AxiosInstance): void => {
  interceptor.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      if (config.method !== "post" || !__DEV__) {
        return config
      }

      if (config.url?.includes("api/v1/appointments")) {
        config.adapter = async () => ({
          data: {
            id: faker.number.bigInt().toString(),
            professional_id: faker.number.bigInt().toString(),
            patient_id: faker.number.bigInt().toString(),
            unit_id: faker.number.bigInt().toString(),
            status: faker.helpers.enumValue(Status),
            date: faker.date.anytime().toISOString().split("T")[0],
            time: faker.date.anytime().toTimeString(),
            createdAt: faker.date.anytime().toISOString(),
            updatedAt: faker.date.anytime().toISOString(),
          },
          status: 201,
          statusText: "Created",
          headers: { "Content-Type": "application/json" },
          config,
        })
      }

      return config
    },
  )
}
