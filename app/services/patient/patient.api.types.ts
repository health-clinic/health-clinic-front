import { Address } from "../appointment/appointment.api.types"

export type Patient = {
    id: number
    address: Address
    name: string
    email: string
    document: string
    phone: string
    birthdate: string
    role: "patient"
    lastVisit: string
    createdAt: string
    updatedAt: string
}

export type PatientResponse = Patient[] 