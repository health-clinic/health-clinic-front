import { applySnapshot, types } from "mobx-state-tree"
import {
  ProfessionalScheduleModel,
  ProfessionalScheduleSnapshotIn,
} from "./professional-schedule.model"

export const ProfessionalScheduleStore = types
  .model("ProfessionalScheduleStore")
  .props({ items: types.map(ProfessionalScheduleModel) })
  .actions((store) => ({
    set(id: number, attributes: ProfessionalScheduleSnapshotIn) {
      if (store.items.has(id)) {
        const schedule = store.items.get(id)!
        applySnapshot(schedule, attributes)

        return schedule
      }

      const schedule = ProfessionalScheduleModel.create(attributes)
      store.items.set(id, schedule)

      return schedule
    },
  }))
