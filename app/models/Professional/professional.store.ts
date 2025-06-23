import { types } from "mobx-state-tree"
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
    set(id: number, professional: ProfessionalSnapshotIn) {
      if (store.items.has(id)) return store.items.get(id)!

      const createdProfessional = ProfessionalModel.create(professional)
      store.items.set(id, createdProfessional)

      return createdProfessional
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
