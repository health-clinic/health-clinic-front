import { types } from "mobx-state-tree"
import { UnitModel, UnitSnapshotIn } from "@/models/Unit/unit.model"

export const UnitStore = types
  .model("UnitStore")
  .props({ items: types.map(UnitModel) })
  .actions((store) => ({
    set(id: number, unit: UnitSnapshotIn) {
      if (store.items.has(id)) return store.items.get(id)!

      const createdUnit = UnitModel.create(unit)
      store.items.set(id, createdUnit)

      return createdUnit
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
