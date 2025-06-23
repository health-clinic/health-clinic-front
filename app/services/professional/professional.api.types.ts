import { Patient } from "../appointment/appointment.api.types"
import { Unit } from "../unit/unit.api.types"

export type Schedule = {
  id: number
  unit: Unit
  dayOfWeek: number // 0 = Sunday, 6 = Saturday
  start: string
  end: string
  createdAt: string
  updatedAt: string
}

export type Professional = {
  id: number
  address: null
  name: string
  email: string
  crm: string
  role: "professional"
  specialty: string
  createdAt: string
  updatedAt: string
  schedules: Schedule[]
  units: Unit[]
}

export type ProfessionalResponse = Professional[]

export type RecentPatientsResponse = Patient[]
