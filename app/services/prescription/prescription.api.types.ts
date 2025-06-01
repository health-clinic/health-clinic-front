import { Appointment } from "@/services/appointment/appointment.api.types"

export interface Prescription {
  id: number
  appointment: Appointment
  name: string
  dosage: string
  frequency: string
  duration: string
  createdAt: string
  updatedAt: string
}

export type PrescriptionResponse = Prescription[]
