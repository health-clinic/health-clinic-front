import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { AddressModel } from "@/models/Address"

export const UserModel = types
  .model("User")
  .props({
    id: types.identifierNumber,
    address: types.maybeNull(types.reference(AddressModel)),
    name: types.string,
    email: types.string,
    avatar: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    birthdate: types.maybeNull(types.Date),
    document: types.maybeNull(types.string),
    role: types.enumeration("Role", ["administrator", "patient", "professional"]),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .views((self) => ({
    isAdministrator: () => self.role === "administrator",
    isPatient: () => self.role === "patient",
    isProfessional: () => self.role === "professional",
  }))
  .actions(withSetPropAction)

export interface User extends Instance<typeof UserModel> {}

export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
