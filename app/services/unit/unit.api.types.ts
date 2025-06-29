type ProfessionalSchedule = {
  id: number
  professionalId: number
  unitId: number
  dayOfWeek: number
  start: string
  end: string
  createdAt: string
  updatedAt: string
}

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

export type UnitSchedule = {
  id: number
  dayOfWeek: number // 0 = Sunday, 6 = Saturday
  opening: string // HH:mm format
  closing: string // HH:mm format
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
  schedules?: UnitSchedule[]
  professionalSchedules?: ProfessionalSchedule[]
}

export type UnitResponse = Unit[]

export type CreateUnitAddressPayload = {
  zip_code: string
  state: string
  city: string
  district: string
  street: string
  number: number
}

export type CreateUnitPayload = {
  name: string
  phone: string
  address: CreateUnitAddressPayload
}

export type UpdateUnitPayload = {
  name?: string
  address_id?: number
}
