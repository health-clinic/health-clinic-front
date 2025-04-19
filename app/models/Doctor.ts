import { Instance, types } from "mobx-state-tree"
import { withSetPropAction } from "@/models/helpers/withSetPropAction"
import { UserModel } from "@/models/User"

export const DoctorModel = types
  .model("Doctor")
  .props({
    id: types.identifier,
    user: types.reference(UserModel),
    crm: types.string,
    specialty: types.string,
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction);

export interface Doctor extends Instance<typeof DoctorModel> {}
