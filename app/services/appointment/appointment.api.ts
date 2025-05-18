import { Api } from "../api"
import { GeneralApiProblem, getGeneralApiProblem } from "@/services/api/apiProblem"
import { ApiResponse } from "apisauce"
import { AppointmentSnapshotIn } from "@/models/Appointment"

interface CreateData {
  professional_id: number
  patient_id: number
  unit_id: number
  scheduled_for: string
}

interface UpdateData {
  date?: string
  time?: string
}

interface FiltersData {
  status?: "pending" | "cancelled" | "completed"
  date_from?: string
  date_to?: string
  professional_id?: number
  unit_id?: number
  patient_id?: number
}

export const createAppointmentApi = (api: Api) => {
  return {
    findAll: async (
      filters?: FiltersData,
    ): Promise<{ kind: "ok"; appointments: AppointmentSnapshotIn[] } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.get(
        "api/v1/appointments",
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
        return { kind: "ok", appointments: response.data }
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
    ): Promise<{ kind: "ok"; appointment: AppointmentSnapshotIn } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.get(`api/v1/appointments/${id}`)
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
        return { kind: "ok", appointment: response.data }
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

    book: async (
      data: CreateData,
    ): Promise<{ kind: "ok"; appointment: AppointmentSnapshotIn } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.post("api/v1/appointments", data)
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
        return { kind: "ok", appointment: response.data }
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
      data: UpdateData,
    ): Promise<{ kind: "ok"; appointment: AppointmentSnapshotIn } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.put(`api/v1/appointments/${id}`, data)
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
        const { appointment } = response.data

        return { kind: "ok", appointment }
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

    cancel: async (id: number): Promise<{ kind: "ok" } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.delete(`api/v1/appointments/${id}`)
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
