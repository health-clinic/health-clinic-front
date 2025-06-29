import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UnitScheduleModel } from "./unit-schedule.model"

export const UnitScheduleStore = types
  .model("UnitScheduleStore")
  .props({
    schedules: types.map(UnitScheduleModel),
  })
  .actions((self) => ({
    set(id: number, unitSchedule: any) {
      self.schedules.set(String(id), unitSchedule)
      return self.schedules.get(String(id))
    },
  }))

export interface UnitScheduleStoreInstance extends Instance<typeof UnitScheduleStore> {}
export interface UnitScheduleStoreSnapshot extends SnapshotOut<typeof UnitScheduleStore> {}
