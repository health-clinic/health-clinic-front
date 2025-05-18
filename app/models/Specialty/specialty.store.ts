import { types } from "mobx-state-tree"
import { SpecialtyModel, SpecialtySnapshotIn } from "@/models/Specialty/specialty.model"

export const SpecialtyStore = types
  .model("SpecialtyStore")
  .props({ items: types.map(SpecialtyModel) })
  .actions((store) => ({
    set(id: number, specialty: SpecialtySnapshotIn) {
      if (store.items.has(id)) return

      store.items.set(id, SpecialtyModel.create(specialty))
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
