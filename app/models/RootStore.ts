import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { AddressStore } from "@/models/Address"
import { AdministratorStore } from "@/models/Administrator"
import { LoadingStore } from "@/models/Loading"
import { PatientStore } from "@/models/Patient"
import { ProfessionalStore } from "@/models/Professional"
import { UserStore } from "@/models/User"
import { SpecialtyStore } from "@/models/Specialty"
import { AppointmentStore } from "@/models/Appointment"
import { UnitStore } from "@/models/Unit"
import { PrescriptionStore } from "@/models/Prescription"
import { NotificationStore } from "@/models/Notification"

export const RootStoreModel = types.model("RootStore").props({
  loadingStore: types.optional(LoadingStore, { isLoading: false }),

  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  userStore: types.optional(UserStore, {}),

  addressStore: types.optional(AddressStore, {}),
  administratorStore: types.optional(AdministratorStore, {}),
  appointmentStore: types.optional(AppointmentStore, {}),
  notificationStore: types.optional(NotificationStore, {}),
  patientStore: types.optional(PatientStore, {}),
  prescriptionStore: types.optional(PrescriptionStore, {}),
  professionalStore: types.optional(ProfessionalStore, {}),
  specialtyStore: types.optional(SpecialtyStore, {}),
  unitStore: types.optional(UnitStore, {}),
})

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
