import { Instance, types } from "mobx-state-tree"
import { AppointmentModel, AppointmentSnapshotIn } from "@/models/Appointment"

export const AppointmentStore = types
  .model("AppointmentStore")
  .props({ items: types.map(AppointmentModel) })
  .actions((store) => ({
    set(id: number, appointment: AppointmentSnapshotIn): Instance<typeof AppointmentModel> {
      if (store.items.has(id)) return store.items.get(id)!

      const createdAppointment = AppointmentModel.create(appointment)
      store.items.set(id, createdAppointment)

      return createdAppointment
    },

    delete(id: string) {
      store.items.delete(id)
    },
  }))
