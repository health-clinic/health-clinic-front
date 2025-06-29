import { applySnapshot, types } from "mobx-state-tree"
import { ProfessionalModel, ProfessionalSnapshotIn } from "@/models/Professional"

export const ProfessionalStore = types
  .model("ProfessionalStore")
  .props({ items: types.map(ProfessionalModel) })
  .views((store) => ({
    get total() {
      return store.items.size
    },
  }))
  .actions((store) => ({
    set(id: number, attributes: ProfessionalSnapshotIn) {
      if (store.items.has(id)) {
        const professional = store.items.get(id)!
        applySnapshot(professional, attributes)

        return professional
      }

      const professional = ProfessionalModel.create(attributes)
      store.items.set(id, professional)

      return professional
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
