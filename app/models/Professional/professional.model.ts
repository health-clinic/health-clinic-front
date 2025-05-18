import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "@/models/helpers/withSetPropAction"
import { SpecialtyModel } from "@/models/Specialty/specialty.model"
import { UnitModel } from "@/models/Unit/unit.model"
import { UserModel } from "@/models/User"

export const ProfessionalModel = types
  .model("Professional")
  .props({
    id: types.identifierNumber,
    specialty: types.string,
    unit: types.reference(UnitModel),
    user: types.reference(UserModel),
    crm: types.string,
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Professional extends Instance<typeof ProfessionalModel> {}

export interface ProfessionalSnapshotIn extends SnapshotIn<typeof ProfessionalModel> {}
