import { Instance, SnapshotIn, types, getRoot } from "mobx-state-tree"
import { withSetPropAction } from "@/models/helpers/withSetPropAction"

type RootStoreType = {
  professionalStore: { items: Map<string, any> }
}

export const ProfessionalScheduleModel = types
  .model("ProfessionalSchedule")
  .props({
    id: types.identifierNumber,
    professionalId: types.number,
    unitId: types.number,
    dayOfWeek: types.number, // 0 = Sunday, 6 = Saturday
    start: types.string,
    end: types.string,
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .views((self) => ({
    get professional() {
      try {
        const rootStore = getRoot(self) as RootStoreType
        
        if (!rootStore?.professionalStore?.items) {
          return null
        }
        
        return rootStore.professionalStore.items.get(String(self.professionalId)) || null
      } catch (error) {
        console.warn("Error accessing professional from schedule:", error)
        return null
      }
    },
  }))
  .actions(withSetPropAction)

export interface ProfessionalSchedule extends Instance<typeof ProfessionalScheduleModel> {}

export interface ProfessionalScheduleSnapshotIn extends SnapshotIn<typeof ProfessionalScheduleModel> {} 