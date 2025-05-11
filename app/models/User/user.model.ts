import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { AddressModel } from "@/models/Address"
import { User as UserPayload } from "@/services/authentication/authentication.api.types"

export const UserModel = types
  .model("User")
  .props({
    id: types.identifierNumber,
    address: types.reference(AddressModel),
    name: types.string,
    email: types.string,
    avatar: types.maybeNull(types.string),
    phone: types.string,
    birthdate: types.Date,
    document: types.string,
    role: types.enumeration("Role", ["administrator", "patient", "professional"]),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .preProcessSnapshot((snapshot: UserPayload) => ({
    ...snapshot,
    address: snapshot?.address?.id,
    birthdate: new Date(snapshot?.birthdate),
    createdAt: new Date(snapshot?.createdAt),
    updatedAt: new Date(snapshot?.updatedAt),
  }))
  .views((self) => ({
    isAdministrator: () => self.role === "administrator",
    isPatient: () => self.role === "patient",
    isProfessional: () => self.role === "professional",
  }))
  .actions(withSetPropAction)

export interface User extends Instance<typeof UserModel> {}

export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
