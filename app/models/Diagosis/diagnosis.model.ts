import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "@/models/helpers/withSetPropAction"

export const DiagnosisModel = types
  .model("Diagnosis")
  .props({
    id: types.identifierNumber,
    code: types.string,
    title: types.string,
    severity: types.enumeration("Severity", ["Mild", "Moderate", "Severe"]),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Diagnosis extends Instance<typeof DiagnosisModel> {}

export interface DiagnosisSnapshotIn extends SnapshotIn<typeof DiagnosisModel> {}
