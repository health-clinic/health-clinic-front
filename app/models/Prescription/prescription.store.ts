import { Instance, types } from "mobx-state-tree"
import { PrescriptionModel, PrescriptionSnapshotIn } from "@/models/Prescription"

export const PrescriptionStore = types
  .model("PrescriptionStore")
  .props({ items: types.map(PrescriptionModel) })
  .actions((store) => ({
    set(id: number, prescription: PrescriptionSnapshotIn): Instance<typeof PrescriptionModel> {
      if (store.items.has(id)) return store.items.get(id)!

      const createdPrescription = PrescriptionModel.create(prescription)
      store.items.set(id, createdPrescription)

      return createdPrescription
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
