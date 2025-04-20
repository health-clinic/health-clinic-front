import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { AddressModel } from "@/models/Address"
import { AdministratorModel } from "@/models/Administrator"
import { ProfessionalModel } from "@/models/Professional"
import { PatientModel } from "@/models/Patient"

export const UserModel = types
  .model("User")
  .props({
    id: types.identifierNumber,
    address: types.reference(AddressModel),
    admin: types.maybe(types.reference(types.late(() => AdministratorModel))),
    professional: types.maybe(types.reference(types.late(() => ProfessionalModel))),
    patient: types.maybe(types.reference(types.late(() => PatientModel))),
    name: types.string,
    email: types.string,
    phone: types.string,
    birthdate: types.string,
    document: types.string,
    role: types.enumeration("Role", ["ADMINISTRATOR", "PATIENT", "DOCTOR"]),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)
  .views((self) => ({
    isAdministrator: () => self.role === "ADMINISTRATOR",
    isProfessional: () => self.role === "DOCTOR",
    isPatient: () => self.role === "PATIENT",
  }))

export interface User extends Instance<typeof UserModel> {}

export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
