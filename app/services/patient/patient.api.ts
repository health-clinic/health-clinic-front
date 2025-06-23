import { Api } from "../api"
import { GeneralApiProblem, getGeneralApiProblem } from "@/services/api/apiProblem"
import { ApiResponse } from "apisauce"
import { PatientResponse } from "./patient.api.types"

export const createPatientApi = (api: Api) => {
  return {
    findAll: async (): Promise<{ kind: "ok"; patients: PatientResponse } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.get("api/v1/patients")
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