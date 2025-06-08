import { Instance, types } from "mobx-state-tree"
import { NotificationModel, NotificationSnapshotIn } from "./notification.model"

export const NotificationStore = types
  .model("NotificationStore")
  .props({
    items: types.map(NotificationModel),
  })
  .views((store) => ({
    get unreadCount() {
      return Array.from(store.items.values()).filter((notification) => !notification.isRead).length
    },

    get sortedNotifications() {
      return Array.from(store.items.values()).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      )
    },
  }))
  .actions((store) => ({
    set(id: number, notification: NotificationSnapshotIn): Instance<typeof NotificationModel> {
      if (store.items.has(id)) return store.items.get(id)!

      const createdNotification = NotificationModel.create(notification)
      store.items.set(id, createdNotification)

      return createdNotification
    },

    markAsRead(id: number) {
      const notification = store.items.get(id)
      if (notification) {
        notification.setProp("isRead", true)
      }
    },

    markAllAsRead() {
      store.items.forEach((notification) => {
        notification.setProp("isRead", true)
      })
    },

    delete(id: number) {
      store.items.delete(id.toString())
    },

    clear() {
      store.items.clear()
    },
  })) 