import { getRoot, types } from "mobx-state-tree"
import { User, UserModel } from "@/models/User"
import { RootStore } from "@/models"

export const UserStore = types
  .model("UserStore")
  .props({ user: types.maybe(UserModel) })
  .actions((store) => ({
    assign(user: User): void {
      const root = getRoot<RootStore>(store)

      const { address, administrator, patient, professional } = user

      if (administrator) {
        root.administratorStore.set(administrator.id, administrator)
      }

      if (address) {
        root.addressStore.set(address.id, address)
      }

      if (patient) {
        root.patientStore.set(patient.id, patient)
      }

      if (professional) {
        root.professionalStore.set(professional.id, professional)
      }

      store.user = {
        ...user,
        address: user.address.id,
        administrator: user.administrator?.id,
        patient: user.patient?.id,
        professional: user.professional?.id,
        birthdate: new Date(user.birthdate),
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }
    },

    revoke(): void {
      const root = getRoot<RootStore>(store)

      if (store.user?.administrator) {
        root.administratorStore.delete(String(store.user.administrator.id))
      }

      if (store.user?.address) {
        root.addressStore.delete(String(store.user.address.id))
      }

      if (store.user?.patient) {
        root.patientStore.delete(String(store.user.patient.id))
      }

      if (store.user?.professional) {
        root.professionalStore.delete(String(store.user.professional.id))
      }

      store.user = undefined
    },
  }))
