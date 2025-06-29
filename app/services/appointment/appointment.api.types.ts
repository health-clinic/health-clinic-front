import { Patient } from "../patient/patient.api.types"
import { Professional } from "../professional/professional.api.types"

export type Address = {
  id: number
  zipCode: string
  state: string
  city: string
  district: string
  street: string
  number: number
  createdAt: string
  updatedAt: string
}

export type Unit = {
  id: number
  addressId: number
  name: string
  phone: string
  createdAt: string
  updatedAt: string
  address: Address
}

export type AppointmentStatus = "scheduled" | "cancelled" | "completed"

export type Appointment = {
  id: number
  status: AppointmentStatus
  complaints: any[]
  scheduledFor: string
  scheduledAt: string
  createdAt: string
  updatedAt: string
  patient: Patient
  professional: Professional
  unit: Unit
}

export type AppointmentResponse = Appointment[]
