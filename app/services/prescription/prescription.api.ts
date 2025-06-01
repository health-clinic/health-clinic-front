import { Api } from "../api"
import { GeneralApiProblem, getGeneralApiProblem } from "@/services/api/apiProblem"
import { ApiResponse } from "apisauce"
import { PrescriptionResponse } from "./prescription.api.types"

interface FiltersData {
  patient_id?: number
}

export const createPrescriptionApi = (api: Api) => {
  return {
    findAll: async (
      filters?: FiltersData,
    ): Promise<{ kind: "ok"; prescriptions: PrescriptionResponse[] } | GeneralApiProblem> => {
      const response: ApiResponse<{ data: PrescriptionResponse }> = await api.apisauce.get(
        "api/v1/prescriptions",
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
        return { kind: "ok", prescriptions: response.data }
      } catch (error: any) {
        if (__DEV__ && error instanceof Error) {
          console.error(
            `Bad data: ${error.message}\n${JSON.stringify(response.data, null, 2)}`,
            error.stack,
          )
        }

        return { kind: "bad-data" }
      }
    },
  }
}
