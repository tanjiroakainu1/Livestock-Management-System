import type { User } from '../types/auth'

/** Pre-seeded accounts for all 5 roles — shown on login and used for quick access */
export const DEFAULT_USERS: User[] = [
  {
    id: 'user-super-admin',
    fullName: 'Alex Rivera',
    email: 'admin@livestock.com',
    password: 'admin123',
    roleId: 'super-admin',
    farmName: 'Green Valley Farm Network',
    phone: '+1 555-0101',
    isDefault: true,
    createdAt: '2024-01-15T08:00:00.000Z',
  },
  {
    id: 'user-farm-manager',
    fullName: 'Jordan Mitchell',
    email: 'manager@livestock.com',
    password: 'manager123',
    roleId: 'farm-manager',
    farmName: 'Green Valley Farm',
    phone: '+1 555-0102',
    isDefault: true,
    createdAt: '2024-02-01T08:00:00.000Z',
  },
  {
    id: 'user-veterinarian',
    fullName: 'Dr. Sam Chen',
    email: 'vet@livestock.com',
    password: 'vet123',
    roleId: 'veterinarian',
    farmName: 'Green Valley Farm',
    phone: '+1 555-0103',
    isDefault: true,
    createdAt: '2024-02-10T08:00:00.000Z',
  },
  {
    id: 'user-caretaker',
    fullName: 'Taylor Brooks',
    email: 'caretaker@livestock.com',
    password: 'caretaker123',
    roleId: 'livestock-caretaker',
    farmName: 'Green Valley Farm',
    phone: '+1 555-0104',
    isDefault: true,
    createdAt: '2024-03-01T08:00:00.000Z',
  },
  {
    id: 'user-farm-owner',
    fullName: 'Morgan Hayes',
    email: 'owner@livestock.com',
    password: 'owner123',
    roleId: 'farm-owner',
    farmName: 'Green Valley Farm',
    phone: '+1 555-0105',
    isDefault: true,
    createdAt: '2024-01-01T08:00:00.000Z',
  },
]

export function getDefaultUserByRole(roleId: User['roleId']): User | undefined {
  return DEFAULT_USERS.find((u) => u.roleId === roleId)
}
