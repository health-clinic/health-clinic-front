import { Instance, types } from "mobx-state-tree"
import { withSetPropAction } from "@/models/helpers/withSetPropAction"
import { DoctorModel } from "@/models/Doctor"

export const AppointmentModel = types
  .model("Appointment")
  .props({
    id: types.identifier,
    // clinic: types.reference(ClinicModel),
    doctor: types.reference(DoctorModel),
    date: types.Date,
    status: types.enumeration("Status", ["confirmed", "pending", "cancelled", "completed"]),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Appointment extends Instance<typeof AppointmentModel> {}
