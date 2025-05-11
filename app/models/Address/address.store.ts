import { types } from "mobx-state-tree"
import { AddressModel, AddressSnapshotIn } from "@/models/Address"

export const AddressStore = types
  .model("AddressStore")
  .props({ items: types.map(AddressModel) })
  .actions((store) => ({
    set(id: number, address: AddressSnapshotIn) {
      store.items.set(id, { ...address })
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
