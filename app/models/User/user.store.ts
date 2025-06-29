import { applySnapshot, getRoot, types } from "mobx-state-tree"
import { User as Entity, UserModel, UserSnapshotIn } from "@/models/User"
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

      this.set(user.id, {
        ...user,
        address: user.address?.id,
        birthdate: user.birthdate ? new Date(user.birthdate) : null,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      })

      store.userId = user.id
    },

    revoke(): void {
      const root = getRoot<RootStore>(store)

      if (store.user?.address) {
        root.addressStore.delete(String(store.user.address.id))
      }

      store.userId = undefined
    },

    set(id: number, attributes: UserSnapshotIn): Entity {
      if (store.items.has(id)) {
        const user = store.items.get(id)!
        applySnapshot(user, attributes)

        return user
      }

      const user = UserModel.create(attributes)
      store.items.set(id, user)

      return user
    },
  }))
