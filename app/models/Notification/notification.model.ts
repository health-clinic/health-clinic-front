import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "@/models/helpers/withSetPropAction"
import { UserModel } from "@/models/User"

export const NotificationModel = types
  .model("Notification")
  .props({
    id: types.identifierNumber,
    user: types.reference(UserModel),
    title: types.string,
    content: types.string,
    metadata: types.optional(types.string, ""),
    readAt: types.maybeNull(types.Date),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Notification extends Instance<typeof NotificationModel> {}
export interface NotificationSnapshotIn extends SnapshotIn<typeof NotificationModel> {} 