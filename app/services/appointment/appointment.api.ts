import { Api } from "../api"
import { GeneralApiProblem, getGeneralApiProblem } from "@/services/api/apiProblem"
import { ApiResponse } from "apisauce"
import { AppointmentSnapshotIn } from "@/models/Appointment"

interface ScheduleAppointment {
  professional_id: number
  patient_id: number
  unit_id: number
  date: string
  time: string
}

export const createAppointmentApi = (api: Api) => {
  return {
    schedule: async (
      data: ScheduleAppointment,
    ): Promise<{ kind: "ok"; appointment: AppointmentSnapshotIn } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.post("api/v1/appointments", data)
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      try {
        const { appointment } = response.data

        return { kind: "ok", appointment }
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
  }
}
