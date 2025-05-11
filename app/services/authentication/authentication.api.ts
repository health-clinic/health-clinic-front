import { Api } from "../api"
import { RegisterPayload } from "@/screens/Auth/RegisterScreen/RegisterForm"
import { GeneralApiProblem, getGeneralApiProblem } from "@/services/api/apiProblem"
import { ApiResponse } from "apisauce"
import { AuthPayload, AuthSession } from "@/services/authentication/authentication.api.types"

export const createAuthenticationApi = (api: Api) => {
  return {
    login: async (email: string, password: string): Promise<AuthSession | GeneralApiProblem> => {
      const response: ApiResponse<AuthPayload> = await api.apisauce.post("api/v1/auth/login", {
        email,
        password,
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      try {
        const { token, user } = response.data

        return { kind: "ok", token, user }
      } catch (e) {
        if (__DEV__ && e instanceof Error) {
          console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
        }

        return { kind: "bad-data" }
      }
    },

    register: async (data: RegisterPayload): Promise<AuthSession | GeneralApiProblem> => {
      const response: ApiResponse<AuthPayload> = await api.apisauce.post(
        "api/v1/auth/register",
        data,
      )
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      try {
        const { token, user } = response.data

        return { kind: "ok", token, user }
      } catch (e) {
        if (__DEV__ && e instanceof Error) {
          console.error(
            `Bad data: ${e.message}\n${JSON.stringify(response.data, null, 2)}`,
            e.stack,
          )
        }

        return { kind: "bad-data" }
      }
    },

    sendForgotPasswordMail: async (email: string): Promise<{ kind: "ok" } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.post("api/v1/auth/forgot-password", {
        email,
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok" }
    },

    isCodeMatch: async (
      code: string,
    ): Promise<{ kind: "ok"; match: boolean } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.post("api/v1/auth/verify-code", {
        code,
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      try {
        const { match } = response.data

        return { kind: "ok", match }
      } catch (e) {
        if (__DEV__ && e instanceof Error) {
          console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
        }

        return { kind: "bad-data" }
      }
    },

    resetUserPassword: async (
      email: string,
      password: string,
    ): Promise<{ kind: "ok" } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.post("api/v1/auth/reset-password", {
        email,
        password,
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok" }
    },
  }
}
