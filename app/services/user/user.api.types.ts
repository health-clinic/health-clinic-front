export interface UpdateUserPayload {
  role?: "administrator" | "patient" | "professional"
  name?: string
  email?: string
  password?: string // Optional for updates
  confirmPassword?: string // Optional for updates
  document?: string
  phone?: string
  birthdate?: string
  cns?: string
  address?: {
    zipCode: string
    street: string
    number: string
    district: string
    city: string
    state: string
  }
  crm?: string
  specialty?: string
}

export interface UpdateUserResponse {
  kind: "ok"
  user: {
    id: number
    address?: {
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
    name: string
    email: string
    avatar?: string
    phone?: string
    birthdate?: string
    document?: string
    role: string
    createdAt: string
    updatedAt: string
  }
}
