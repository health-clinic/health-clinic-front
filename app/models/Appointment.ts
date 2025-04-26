import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "@/models/helpers/withSetPropAction"
import { ProfessionalModel } from "@/models/Professional"
import { UnitModel } from "@/models/Unit"
import { PatientModel } from "@/models/Patient"

export const AppointmentModel = types
  .model("Appointment")
  .props({
    id: types.identifierNumber,
    patient: types.reference(PatientModel),
    professional: types.reference(ProfessionalModel),
    unit: types.reference(UnitModel),
    date: types.Date,
    time: types.string,
    status: types.enumeration("Status", ["confirmed", "pending", "cancelled", "completed"]),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Appointment extends Instance<typeof AppointmentModel> {}

export interface AppointmentSnapshotIn extends SnapshotIn<typeof AppointmentModel> {}
