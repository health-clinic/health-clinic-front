import { applySnapshot, types } from "mobx-state-tree"
import { AddressModel, AddressSnapshotIn } from "@/models/Address"

export const AddressStore = types
  .model("AddressStore")
  .props({ items: types.map(AddressModel) })
  .actions((store) => ({
    set(id: number, attributes: AddressSnapshotIn) {
      if (store.items.has(id)) {
        const address = store.items.get(id)!
        applySnapshot(address, attributes)

        return address
      }

      const address = AddressModel.create(attributes)
      store.items.set(id, address)

      return address
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
