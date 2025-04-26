import { types } from "mobx-state-tree"
import { Administrator, AdministratorModel } from "@/models/Administrator"

export const AdministratorStore = types
  .model("AdministratorStore")
  .props({ items: types.map(AdministratorModel) })
  .actions((store) => ({
    set(id: number, administrator: Administrator) {
      store.items.set(id, {
        ...administrator,
        createdAt: new Date(administrator.createdAt),
        updatedAt: new Date(administrator.updatedAt),
      })
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
