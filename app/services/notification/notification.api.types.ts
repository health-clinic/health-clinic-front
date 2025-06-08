import { User } from "@/services/authentication/authentication.api.types"

export interface Notification {
  id: number
  user: User
  title: string
  content: string
  metadata: string
  readAt: string
  createdAt: string
  updatedAt: string
}

export type NotificationResponse = Notification[] 