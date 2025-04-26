import { types } from "mobx-state-tree"
import { Patient, PatientModel } from "@/models/Patient"

export const PatientStore = types
  .model("PatientStore")
  .props({ items: types.map(PatientModel) })
  .actions((store) => ({
    set(id: number, patient: Patient) {
      store.items.set(id, {
        ...patient,
        createdAt: new Date(patient.createdAt),
        updatedAt: new Date(patient.updatedAt),
      })
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
