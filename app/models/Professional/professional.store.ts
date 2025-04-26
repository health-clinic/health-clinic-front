import { types } from "mobx-state-tree"
import { Professional, ProfessionalModel } from "@/models/Professional"

export const ProfessionalStore = types
  .model("ProfessionalStore")
  .props({ items: types.map(ProfessionalModel) })
  .actions((store) => ({
    set(id: number, professional: Professional) {
      store.items.set(id, {
        ...professional,
        createdAt: new Date(professional.createdAt),
        updatedAt: new Date(professional.updatedAt),
      })
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
