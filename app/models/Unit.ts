import { Instance, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { AddressModel } from "@/models/Address"

export const UnitModel = types
  .model("Unit")
  .props({
    id: types.identifierNumber,
    address: types.reference(AddressModel),
    name: types.string,
    distance: types.string,
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Unit extends Instance<typeof UnitModel> {}
