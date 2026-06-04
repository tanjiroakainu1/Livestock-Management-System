import type { RoleId } from './roles'

export interface User {
  id: string
  fullName: string
  email: string
  password: string
  roleId: RoleId
  farmName?: string
  phone?: string
  isDefault?: boolean
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  fullName: string
  email: string
  password: string
  roleId: RoleId
  farmName?: string
  phone?: string
}
