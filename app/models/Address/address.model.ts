import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { Address as AddressPayload } from "@/services/authentication/authentication.api.types"

export const AddressModel = types
  .model("Address")
  .props({
    id: types.identifierNumber,
    zipCode: types.string,
    state: types.string,
    city: types.string,
    district: types.string,
    street: types.string,
    number: types.number,
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .preProcessSnapshot((snapshot: AddressPayload) => ({
    ...snapshot,
    createdAt: new Date(snapshot?.createdAt),
    updatedAt: new Date(snapshot?.updatedAt),
  }))
  .actions(withSetPropAction)

export interface Address extends Instance<typeof AddressModel> {}

export interface AddressSnapshotIn extends SnapshotIn<typeof AddressModel> {}
