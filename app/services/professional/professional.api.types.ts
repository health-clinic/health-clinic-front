import { Patient } from "../appointment/appointment.api.types"

export type Professional = {
  id: number
  address: null
  name: string
  email: string
  role: "professional"
  specialty: string
  createdAt: string
  updatedAt: string
}

export type ProfessionalResponse = Professional[]

export type RecentPatientsResponse = Patient[]
