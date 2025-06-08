import { Api } from "../api"
import { GeneralApiProblem, getGeneralApiProblem } from "@/services/api/apiProblem"
import { ApiResponse } from "apisauce"
import { NotificationResponse } from "./notification.api.types"
import { NotificationSnapshotIn } from "@/models/Notification"

export const createNotificationApi = (api: Api) => {
  return {
    findAll: async (): Promise<{ kind: "ok"; notifications: NotificationSnapshotIn[] } | GeneralApiProblem> => {
      const response: ApiResponse<NotificationResponse> = await api.apisauce.get("api/v1/notifications")
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
        return { kind: "ok", notifications: response.data }
      } catch (error: any) {
        if (__DEV__ && error instanceof Error) {
          console.error(
            `Bad data: ${error.message}\n${JSON.stringify(response.data, null, 2)}`,
            error.stack,
          )
        }

        return { kind: "bad-data", data: { error: "Ocorreu um erro inesperado" } }
      }
    },

    markAsRead: async (notifications: number[]): Promise<{ kind: "ok" } | GeneralApiProblem> => {
      const response: ApiResponse<any> = await api.apisauce.post(`api/v1/notifications/read`, notifications)
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) {
          return {
            ...problem,
            ...response,
          }
        }
      }

      return { kind: "ok" }
    },
  }
} 