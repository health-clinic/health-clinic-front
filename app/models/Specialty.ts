import { Instance, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const SpecialtyModel = types
  .model("Specialty")
  .props({
    id: types.identifierNumber,
    name: types.string,
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Specialty extends Instance<typeof SpecialtyModel> {}
