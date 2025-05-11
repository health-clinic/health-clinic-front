import { getRoot, types } from "mobx-state-tree"
import { UserModel } from "@/models/User"
import { RootStore } from "@/models"
import { AddressModel } from "../Address"
import { User } from "@/services/authentication/authentication.api.types"

export const UserStore = types
  .model("UserStore")
  .props({ user: types.maybe(UserModel) })
  .actions((store) => ({
    assign(user: User): void {
      const root = getRoot<RootStore>(store)

      root.addressStore.set(user.address.id, AddressModel.create(user.address))

      store.user = UserModel.create(user)
    },

    revoke(): void {
      const root = getRoot<RootStore>(store)

      if (store.user?.address) {
        root.addressStore.delete(String(store.user.address.id))
      }

      store.user = undefined
    },
  }))
