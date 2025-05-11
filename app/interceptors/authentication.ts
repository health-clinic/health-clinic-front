import { faker } from "@faker-js/faker"
import { AxiosInstance, InternalAxiosRequestConfig } from "axios"

const generateUser = (role: "patient" | "professional"): object => {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    address: {
      id: faker.number.int({ min: 1, max: 1000 }),
      zipCode: faker.location.zipCode("#####-###"),
      state: faker.location.state(),
      city: faker.location.city(),
      district: faker.location.county(),
      street: faker.location.street(),
      number: faker.number.int({ min: 1, max: 9999 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    phone: faker.phone.number({ style: "international" }),
    birthdate: faker.date.birthdate({ min: 18, max: 90, mode: "age" }),
    document: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
    role,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
}

export const authenticationRouter = (interceptor: AxiosInstance): void => {
  interceptor.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      if (config.method !== "post" || !__DEV__) {
        return config
      }

      const user = faker.helpers.arrayElement([
        () => generateUser("patient"),
        () => generateUser("professional"),
      ])()

      if (config.url?.includes("api/v1/auth/register")) {
        config.adapter = async () => ({
          data: {
            token: "::demo-token::",
            user,
          },
          status: 201,
          statusText: "Created",
          headers: { "Content-Type": "application/json" },
          config,
        })
      }

      if (config.url?.includes("api/v1/auth/login")) {
        const { email, password }: any = config.data

        if (email === "demo@demo.com" && password === "123456") {
          config.adapter = async () => ({
            data: {},
            status: 422,
            statusText: "Unprocessable Entity",
            headers: { "Content-Type": "application/json" },
            config,
          })

          return config
        }

        config.adapter = async () => ({
          data: {
            token: "::demo-token::",
            user,
          },
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" },
          config,
        })
      }

      if (config.url?.includes("api/v1/auth/forgot-password")) {
        config.adapter = async () => ({
          data: {},
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" },
          config,
        })
      }

      if (config.url?.includes("api/v1/auth/verify-code")) {
        const { code }: any = config.data

        if (code !== "123456") {
          config.adapter = async () => ({
            data: {
              match: false,
            },
            status: 200,
            statusText: "OK",
            headers: { "Content-Type": "application/json" },
            config,
          })

          return config
        }

        config.adapter = async () => ({
          data: {
            match: true,
          },
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" },
          config,
        })
      }

      if (config.url?.includes("api/v1/auth/reset-password")) {
        config.adapter = async () => ({
          data: {},
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" },
          config,
        })
      }

      return config
    },
  )
}
