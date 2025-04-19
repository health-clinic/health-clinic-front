import { Instance, types } from "mobx-state-tree"
import { withSetPropAction } from "@/models/helpers/withSetPropAction"
import { UserModel } from "@/models/User"
import { SpecialtyModel } from "@/models/Specialty"
import { UnitModel } from "@/models/Unit"

export const DoctorModel = types
  .model("Doctor")
  .props({
    id: types.identifier,
    specialty: types.reference(SpecialtyModel),
    unit: types.reference(UnitModel),
    user: types.reference(UserModel),
    crm: types.string,
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Doctor extends Instance<typeof DoctorModel> {}
