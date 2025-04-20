import { Instance, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { UserModel } from "@/models/User"

export const PatientModel = types
  .model("Patient")
  .props({
    id: types.identifierNumber,
    user: types.reference(UserModel),
    cns: types.string,
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction);

export interface Patient extends Instance<typeof PatientModel> {}
