import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { UserModel } from "@/models/User"

export const AdministratorModel = types
  .model("Administrator")
  .props({
    id: types.identifierNumber,
    user: types.reference(UserModel),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Administrator extends Instance<typeof AdministratorModel> {}

export interface AdministratorSnapshotIn extends SnapshotIn<typeof AdministratorModel> {}
