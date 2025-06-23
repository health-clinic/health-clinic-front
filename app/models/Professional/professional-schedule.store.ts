import { types } from "mobx-state-tree"
import { ProfessionalScheduleModel, ProfessionalScheduleSnapshotIn } from "./professional-schedule.model"

export const ProfessionalScheduleStore = types
  .model("ProfessionalScheduleStore")
  .props({ items: types.map(ProfessionalScheduleModel) })
  .actions((store) => ({
    set(id: number, schedule: ProfessionalScheduleSnapshotIn) {
      if (store.items.has(id)) return store.items.get(id)!

      const createdSchedule = ProfessionalScheduleModel.create(schedule)
      store.items.set(id, createdSchedule)

      return createdSchedule
    },
  })) 