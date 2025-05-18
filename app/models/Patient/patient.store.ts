import { types } from "mobx-state-tree"
import { PatientModel, PatientSnapshotIn } from "@/models/Patient"

export const PatientStore = types
  .model("PatientStore")
  .props({ items: types.map(PatientModel) })
  .actions((store) => ({
    set(id: number, patient: PatientSnapshotIn) {
      if (store.items.has(id)) return

      store.items.set(id, PatientModel.create(patient))
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
