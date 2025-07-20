import { Api } from "../api"
import { GeneralApiProblem, getGeneralApiProblem } from "@/services/api/apiProblem"
import { ApiResponse } from "apisauce"
import { UpdateUserPayload, UpdateUserResponse } from "./user.api.types"

export const createUserApi = (api: Api) => {
  return {
    update: async (
      id: number,
      data: UpdateUserPayload,
    ): Promise<UpdateUserResponse | GeneralApiProblem> => {
      const updateData = { ...data }
      if (!updateData.password || updateData.password.trim() === "") {
        delete updateData.password
        delete updateData.confirmPassword
      }

      const response: ApiResponse<any> = await api.apisauce.put(`api/v1/users/${id}`, updateData)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) {
          return {
            ...problem,
            ...response,
          }
        }
      }

      try {
        return { kind: "ok", user: response.data }
      } catch (error: any) {
        if (__DEV__ && error instanceof Error) {
          console.error(
            `Bad data: ${error.message}\n${JSON.stringify(response.data, null, 2)}`,
            error.stack,
          )
        }

        return { kind: "bad-data", data: { error: "Bad data received from server" } }
      }
    },
  }
}
