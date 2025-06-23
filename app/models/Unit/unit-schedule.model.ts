import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const UnitScheduleModel = types
  .model("UnitSchedule")
  .props({
    id: types.identifierNumber,
    unitId: types.number,
    dayOfWeek: types.number, // 0 = Sunday, 6 = Saturday
    opening: types.string, // Time format HH:mm
    closing: types.string, // Time format HH:mm
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface UnitSchedule extends Instance<typeof UnitScheduleModel> {}

export interface UnitScheduleSnapshotIn extends SnapshotIn<typeof UnitScheduleModel> {} 