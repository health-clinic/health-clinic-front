import { types } from "mobx-state-tree"
import { AddressModel, AddressSnapshotIn } from "@/models/Address"

export const AddressStore = types
  .model("AddressStore")
  .props({ items: types.map(AddressModel) })
  .actions((store) => ({
    set(id: number, address: AddressSnapshotIn) {
      if (store.items.has(id)) return

      store.items.set(id, AddressModel.create(address))
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
