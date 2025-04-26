import { types } from "mobx-state-tree"
import { Address, AddressModel } from "@/models/Address"

export const AddressStore = types
  .model("AddressStore")
  .props({ items: types.map(AddressModel) })
  .actions((store) => ({
    set(id: number, address: Address) {
      store.items.set(id, {
        ...address,
        createdAt: new Date(address.createdAt),
        updatedAt: new Date(address.updatedAt),
      })
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
