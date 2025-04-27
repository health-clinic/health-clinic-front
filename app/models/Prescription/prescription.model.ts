import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "@/models/helpers/withSetPropAction"

export const PrescriptionModel = types
  .model("Prescription")
  .props({
    id: types.identifierNumber,
    name: types.string,
    dosage: types.string,
    frequency: types.string,
    duration: types.string,
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Prescription extends Instance<typeof PrescriptionModel> {}

export interface PrescriptionSnapshotIn extends SnapshotIn<typeof PrescriptionModel> {}
