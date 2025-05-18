import { types } from "mobx-state-tree"
import { AdministratorModel, AdministratorSnapshotIn } from "@/models/Administrator"

export const AdministratorStore = types
  .model("AdministratorStore")
  .props({ items: types.map(AdministratorModel) })
  .actions((store) => ({
    set(id: number, administrator: AdministratorSnapshotIn) {
      if (store.items.has(id)) return

      store.items.set(id, AdministratorModel.create(administrator))
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
