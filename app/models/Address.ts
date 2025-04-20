import { Instance, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AddressModel = types
  .model("Address")
  .props({
    id: types.identifierNumber,
    zipCode: types.string,
    state: types.string,
    city: types.string,
    district: types.string,
    street: types.string,
    number: types.string,
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction);

export interface Address extends Instance<typeof AddressModel> {}
