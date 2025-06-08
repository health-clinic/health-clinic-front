import { FC, ReactElement, useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { useStores } from "@/models"
import { ChevronLeft } from "lucide-react-native"
import { createNotificationApi } from "@/services/notification/notification.api"
import { api } from "@/services/api"
import { showErrorToast } from "@/components/toast"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
// @ts-ignore
import tailwind from "./../../../../tailwind.config"
import { Notification } from "@/models/Notification"
import { NotificationResponse } from "@/services/notification/notification.api.types"

interface NotificationScreenProps extends AppStackScreenProps<"Notification"> {}

export const NotificationScreen: FC<NotificationScreenProps> = ({
  navigation,
}: NotificationScreenProps): ReactElement => {
  const { loadingStore, notificationStore, userStore, addressStore } = useStores()

  const colors = tailwind.theme.extend.colors

  const [notifications, setNotifications] = useState<Notification[]>([])

  const toNotification = (data: NotificationResponse): Notification[] => {
    return data.map((notification) => {
      if (notification.user.address) {
        addressStore.set(notification.user.address.id, {
          id: notification.user.address.id,
          zipCode: notification.user.address.zipCode,
          state: notification.user.address.state,
          city: notification.user.address.city,
          district: notification.user.address.district,
          street: notification.user.address.street,
          number: Number(notification.user.address.number),
          createdAt: new Date(notification.user.address.createdAt),
          updatedAt: new Date(notification.user.address.updatedAt),
        })
      }

      userStore.set(notification.user.id, {
        id: notification.user.id,
        address: notification.user.address?.id,
        name: notification.user.name,
        email: notification.user.email,
        avatar: null,
        phone: notification.user.phone,
        birthdate: notification.user.birthdate ? new Date(notification.user.birthdate) : null,
        document: notification.user.document,
        role: notification.user.role,
        createdAt: new Date(notification.user.createdAt),
        updatedAt: new Date(notification.user.updatedAt),
      })

      return notificationStore.set(notification.id, {
        id: notification.id,
        user: notification.user.id,
        createdAt: new Date(notification.createdAt),
        updatedAt: new Date(notification.updatedAt),
        readAt: notification.readAt ? new Date(notification.readAt) : null,
        title: notification.title,
        content: notification.content,
        metadata: notification.metadata,
      })
    })
  }

  const fetchNotifications = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createNotificationApi(api).findAll()
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error)

        return
      }

      setNotifications(toNotification(response.notifications))
    } catch (error) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const readAll = async (): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createNotificationApi(api).markAsRead(
        notificationStore.sortedNotifications.map((notification) => notification.id),
      )
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error)

        return
      }

      notificationStore.sortedNotifications.forEach((notification) => {
        notification.readAt = new Date()
      })
    } catch (error) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  const read = async (id: number): Promise<void> => {
    loadingStore.setLoading(true)

    try {
      const response = await createNotificationApi(api).markAsRead(id)
      if (response.kind !== "ok") {
        showErrorToast(response.data?.error)

        return
      }

      notificationStore.markAsRead(id)
    } catch (error) {
      console.error(error)

      showErrorToast("Ocorreu um erro inesperado")
    } finally {
      loadingStore.setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="bg-neutral-200 p-4 flex-row items-center gap-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-9 w-9 items-center justify-center"
        >
          <ChevronLeft size={24} color={colors.neutral[800]} />
        </TouchableOpacity>

        <Text className="text-neutral-800 text-lg font-semibold flex-1">Notificações</Text>

        {notificationStore.unreadCount > 0 && (
          <TouchableOpacity
            onPress={readAll}
            className="bg-primary-500/20 px-3 py-1 rounded-full border border-primary-500/30"
          >
            <Text className="text-primary-500 text-sm font-medium">Marcar todas como lidas</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-4 p-4">
          {notifications.length > 0 ? (
            <View className="flex-col gap-4">
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  className={`p-4 rounded-2xl border ${
                    notification.readAt
                      ? "bg-transparent border-neutral-300"
                      : "bg-primary-500/20 border-primary-500/30"
                  }`}
                  onPress={() => read(notification.id)}
                >
                  <View className="flex-row items-center justify-between">
                    <Text
                      className={`text-base font-medium ${
                        notification.readAt ? "text-neutral-500" : "text-primary-500"
                      }`}
                    >
                      {notification.title}
                    </Text>

                    <Text className="text-xs text-neutral-500">
                      {format(notification.createdAt, "dd 'de' MMMM 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </Text>
                  </View>

                  <Text className="text-sm text-neutral-500 pt-2">{notification.content}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="gap-4 p-4 border border-neutral-500 rounded-2xl">
              <View className="w-full h-0.5 bg-neutral-700">
                <View className="w-0 h-full bg-primary-500" />
              </View>

              <Text className="text-neutral-800 font-medium text-base text-center">
                Nenhuma notificação
              </Text>

              <Text className="text-neutral-600 text-sm text-center">
                Você não possui notificações no momento.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
