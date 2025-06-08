import { Instance, types } from "mobx-state-tree"
import { PatientModel, PatientSnapshotIn } from "@/models/Patient"

export const PatientStore = types
  .model("PatientStore")
  .props({ items: types.map(PatientModel) })
  .actions((store) => ({
    set(id: number, patient: PatientSnapshotIn): Instance<typeof PatientModel> {
      if (store.items.has(id)) return store.items.get(id)!

      const createdPatient = PatientModel.create(patient)
      store.items.set(id, createdPatient)

      return createdPatient
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
