import type { UserSnapshotIn } from "@/models/User"

export type Address = {
  id: number
  zipCode: string
  state: string
  city: string
  district: string
  street: string
  number: number
  createdAt: Date
  updatedAt: Date
}

export type User = {
  id: number
  address: Address
  name: string
  email: string
  avatar: string
  phone: string
  birthdate: Date
  document: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export type AuthSession = {
  kind: "ok"
  token: string
  user: User
}

export type AuthPayload = {
  token: string
  user: User
}
