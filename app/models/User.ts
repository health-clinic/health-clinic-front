import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { AddressModel } from "@/models/Address"
import { AdministratorModel } from "@/models/Administrator"
import { DoctorModel } from "@/models/Doctor"
import { PatientModel } from "@/models/Patient"

export const UserModel = types
  .model("User")
  .props({
    id: types.identifier,
    address: types.reference(AddressModel),
    admin: types.maybe(types.reference(types.late(() => AdministratorModel))),
    doctor: types.maybe(types.reference(types.late(() => DoctorModel))),
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
  .views(self => ({
    isAdministrator: () => self.role === 'ADMINISTRATOR',
    isDoctor: () => self.role === 'DOCTOR',
    isPatient: () => self.role === 'PATIENT',
  }));

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
