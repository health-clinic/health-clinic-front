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
  distance?: string
  createdAt: string
  updatedAt: string
  address: Address
}

export type Professional = {
  id: number
  addressId: null
  address: null
  name: string
  email: string
  role: "professional"
  specialty: string
  createdAt: string
  updatedAt: string
}

export type Patient = {
  id: number
  addressId: number
  address: Address
  name: string
  email: string
  document: string
  phone: string
  birthdate: string
  role: "patient"
  createdAt: string
  updatedAt: string
}

export type AppointmentStatus = "scheduled" | "cancelled" | "completed"

export type Appointment = {
  id: number
  unitId: number
  professionalId: number
  patientId: number
  status: AppointmentStatus
  scheduledFor: string
  scheduledAt: string
  complaints: any[]
  createdAt: string
  updatedAt: string
  unit: Unit
  professional: Professional
  patient: Patient
}

export type AppointmentResponse = Appointment[]
