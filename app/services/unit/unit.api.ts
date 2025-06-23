import { Api } from "../api"
import { GeneralApiProblem, getGeneralApiProblem } from "@/services/api/apiProblem"
import { ApiResponse } from "apisauce"
import { UnitSnapshotIn } from "@/models/Unit"

interface Address {
  zip_code: string
  state: string
  city: string
  district: string
  street: string
  number: number
}

interface UnitSchedule {
  day_of_week: number // 0 = Sunday, 6 = Saturday
  opening: string
  closing: string
}

interface ProfessionalSchedule {
  professional_id: number
  day_of_week: number // 0 = Sunday, 6 = Saturday
  start: string
  end: string
}

export interface CreateUnitData {
  name: string
  phone: string
  address: Address
  schedules: UnitSchedule[]
  professional_schedules?: ProfessionalSchedule[]
}

export interface UpdateUnitData {
  name?: string
  phone?: string
  address?: Address
  schedules: UnitSchedule[]
  professional_schedules?: ProfessionalSchedule[]
}

export const createUnitApi = (api: Api) => {
  return {
    findAll: async (): Promise<{ kind: "ok"; units: UnitSnapshotIn[] } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.get("api/v1/units")
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
        return { kind: "ok", units: response.data }
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

    findById: async (
      id: number,
    ): Promise<{ kind: "ok"; unit: UnitSnapshotIn } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.get(`api/v1/units/${id}`)
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
        return { kind: "ok", unit: response.data }
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

    create: async (
      data: CreateUnitData,
    ): Promise<{ kind: "ok"; unit: UnitSnapshotIn } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.post("api/v1/units", data)
      console.log(response)
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
        return { kind: "ok", unit: response.data }
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

    update: async (
      id: number,
      data: UpdateUnitData,
    ): Promise<{ kind: "ok"; unit: UnitSnapshotIn } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.put(`api/v1/units/${id}`, data)
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
        return { kind: "ok", unit: response.data }
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

    delete: async (id: number): Promise<{ kind: "ok" } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.delete(`api/v1/units/${id}`)
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
        return { kind: "ok" }
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
