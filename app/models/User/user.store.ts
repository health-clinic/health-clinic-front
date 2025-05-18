import { getRoot, types } from "mobx-state-tree"
import { UserModel, UserSnapshotIn } from "@/models/User"
import { RootStore } from "@/models"
import { User } from "@/services/authentication/authentication.api.types"

export const UserStore = types
  .model("UserStore")
  .props({
    items: types.map(UserModel),
    userId: types.maybe(types.number),
  })
  .views((self) => ({
    get user() {
      return self.userId ? self.items.get(self.userId) : undefined
    },
  }))
  .actions((store) => ({
    assign(user: User): void {
      const root = getRoot<RootStore>(store)

      if (user?.address) {
        root.addressStore.set(user.address.id, {
          id: user.address.id,
          zipCode: user.address.zipCode,
          state: user.address.state,
          city: user.address.city,
          district: user.address.district,
          street: user.address.street,
          number: Number(user.address.number),
          createdAt: new Date(user.address.createdAt),
          updatedAt: new Date(user.address.updatedAt),
        })
      }

      const safeUser = {
        ...user,
        address: user.address?.id,
        birthdate: new Date(user.birthdate),
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }

      if (!store.items.has(user.id)) {
        store.items.set(user.id, UserModel.create(safeUser))
      }

      store.userId = user.id
    },

    revoke(): void {
      const root = getRoot<RootStore>(store)

      if (store.user?.address) {
        root.addressStore.delete(String(store.user.address.id))
      }

      store.userId = undefined
    },

    set(id: number, user: UserSnapshotIn) {
      if (!store.items.has(id)) {
        store.items.set(id, UserModel.create(user))
      }
    },
  }))
