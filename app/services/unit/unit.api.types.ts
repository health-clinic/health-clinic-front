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
  distance: string
  createdAt: string
  updatedAt: string
  address: Address
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
  distance?: string
  address: CreateUnitAddressPayload
}

export type UpdateUnitPayload = {
  name?: string
  address_id?: number
  distance?: string
}
