import { Api } from "../api"
import { GeneralApiProblem, getGeneralApiProblem } from "@/services/api/apiProblem"
import { ApiResponse } from "apisauce"
import { ProfessionalResponse, RecentPatientsResponse } from "./professional.api.types"

interface FiltersData {
  specialty?: string
  unit_id?: number
}

export const createProfessionalApi = (api: Api) => {
  return {
    findAll: async (
      filters?: FiltersData,
    ): Promise<{ kind: "ok"; professionals: ProfessionalResponse } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.get(
        "api/v1/professionals",
        filters || {},
      )
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
        return { kind: "ok", professionals: response.data }
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

    findRecentPatients: async (
      id: number,
    ): Promise<{ kind: "ok"; patients: RecentPatientsResponse } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.get(
        `api/v1/professionals/${id}/recent-patients`,
      )
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
        return { kind: "ok", patients: response.data }
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
