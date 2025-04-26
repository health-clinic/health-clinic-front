import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { UserModel } from "@/models/User"

export const PatientModel = types
  .model("Patient")
  .props({
    id: types.identifierNumber,
    user: types.reference(UserModel),
    cns: types.string,
    lastVisit: types.maybeNull(types.Date),
    note: types.maybe(types.string),
    tags: types.optional(types.array(types.string), []),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Patient extends Instance<typeof PatientModel> {}

export interface PatientSnapshotIn extends SnapshotIn<typeof PatientModel> {}
