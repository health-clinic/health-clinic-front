import { applySnapshot, Instance, types } from "mobx-state-tree"
import { NotificationModel, NotificationSnapshotIn } from "./notification.model"

export const NotificationStore = types
  .model("NotificationStore")
  .props({
    items: types.map(NotificationModel),
  })
  .views((store) => ({
    get unreadCount() {
      return Array.from(store.items.values()).filter((notification) => !notification.readAt).length
    },
  }))
  .actions((store) => ({
    set(id: number, attributes: NotificationSnapshotIn): Instance<typeof NotificationModel> {
      if (store.items.has(id)) {
        const notification = store.items.get(id)!
        applySnapshot(notification, attributes)

        return notification
      }

      const notification = NotificationModel.create(attributes)
      store.items.set(id, notification)

      return notification
    },
  }))
