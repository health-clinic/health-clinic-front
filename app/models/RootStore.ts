import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { AddressStore } from "@/models/Address"
import { AdministratorStore } from "@/models/Administrator"
import { LoadingStore } from "@/models/Loading"
import { PatientStore } from "@/models/Patient"
import { ProfessionalStore } from "@/models/Professional"
import { UserStore } from "@/models/User"

export const RootStoreModel = types.model("RootStore").props({
  loadingStore: types.optional(LoadingStore, { isLoading: false }),

  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  userStore: types.optional(UserStore, {}),

  addressStore: types.optional(AddressStore, {}),
  administratorStore: types.optional(AdministratorStore, {}),
  patientStore: types.optional(PatientStore, {}),
  professionalStore: types.optional(ProfessionalStore, {}),
})

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
