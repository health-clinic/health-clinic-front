import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "@/models/helpers/withSetPropAction"
import { ProfessionalModel } from "@/models/Professional"
import { UnitModel } from "@/models/Unit"
import { PatientModel } from "@/models/Patient"
import { PrescriptionModel } from "@/models/Prescription/prescription.model"
import { DiagnosisModel } from "@/models/Diagosis"

export const AppointmentModel = types
  .model("Appointment")
  .props({
    id: types.identifierNumber,
    diagnoses: types.optional(types.array(DiagnosisModel), []),
    patient: types.reference(PatientModel),
    prescriptions: types.optional(types.array(PrescriptionModel), []),
    professional: types.reference(ProfessionalModel),
    unit: types.reference(UnitModel),
    date: types.Date,
    complaints: types.optional(types.array(types.string), []),
    status: types.enumeration("Status", ["Pending", "Confirmed", "Cancelled", "Completed"]),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Appointment extends Instance<typeof AppointmentModel> {}

export interface AppointmentSnapshotIn extends SnapshotIn<typeof AppointmentModel> {}
