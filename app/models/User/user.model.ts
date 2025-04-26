import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { AddressModel } from "@/models/Address"

export const UserModel = types
  .model("User")
  .props({
    id: types.identifierNumber,
    name: types.string,
    email: types.string,
    avatar: types.maybeNull(types.string),
    phone: types.string,
    birthdate: types.Date,
    document: types.string,
    address: types.reference(AddressModel),
    role: types.enumeration("Role", ["ADMINISTRATOR", "PATIENT", "PROFESSIONAL"]),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .views((self) => ({
    isAdministrator: () => self.role === "ADMINISTRATOR",
    isPatient: () => self.role === "PATIENT",
    isProfessional: () => self.role === "PROFESSIONAL",
  }))
  .actions(withSetPropAction)

export interface User extends Instance<typeof UserModel> {}

export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
