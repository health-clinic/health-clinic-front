import { applySnapshot, types } from "mobx-state-tree"
import { UnitModel, UnitSnapshotIn } from "@/models/Unit/unit.model"

export const UnitStore = types
  .model("UnitStore")
  .props({ items: types.map(UnitModel) })
  .views((store) => ({
    get total() {
      return store.items.size
    },
  }))
  .actions((store) => ({
    set(id: number, attributes: UnitSnapshotIn) {
      if (store.items.has(id)) {
        const unit = store.items.get(id)!
        applySnapshot(unit, attributes)

        return unit
      }

      const unit = UnitModel.create(attributes)
      store.items.set(id, unit)

      return unit
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
