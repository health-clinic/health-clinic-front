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
