export type RoleId =
  | 'super-admin'
  | 'farm-manager'
  | 'veterinarian'
  | 'livestock-caretaker'
  | 'farm-owner'

export interface RoleInfo {
  id: RoleId
  name: string
  description: string
  path: string
  color: string
  gradient: string
  ring: string
  emoji: string
}

export const ROLES: RoleInfo[] = [
  {
    id: 'super-admin',
    name: 'Super Admin',
    description: 'Users, roles, farm settings, categories, all records, reports, backup',
    path: '/super-admin',
    color: 'bg-violet-600',
    gradient: 'from-violet-600 via-purple-600 to-indigo-700',
    ring: 'ring-violet-400',
    emoji: '👑',
  },
  {
    id: 'farm-manager',
    name: 'Farm Manager',
    description: 'Livestock, locations, performance, breeding, operations, transactions, reports',
    path: '/farm-manager',
    color: 'bg-sky-600',
    gradient: 'from-sky-500 via-blue-600 to-indigo-600',
    ring: 'ring-sky-400',
    emoji: '🌾',
  },
  {
    id: 'veterinarian',
    name: 'Veterinarian',
    description: 'Health records, checkups, vaccinations, diagnosis, treatments, recovery',
    path: '/veterinarian',
    color: 'bg-teal-600',
    gradient: 'from-teal-500 via-emerald-600 to-cyan-700',
    ring: 'ring-teal-400',
    emoji: '🩺',
  },
  {
    id: 'livestock-caretaker',
    name: 'Livestock Caretaker',
    description: 'Feeding, conditions, weight, sick reports, breeding, housing, daily tasks',
    path: '/livestock-caretaker',
    color: 'bg-amber-500',
    gradient: 'from-amber-500 via-orange-500 to-amber-600',
    ring: 'ring-amber-400',
    emoji: '🧤',
  },
  {
    id: 'farm-owner',
    name: 'Farm Owner',
    description: 'Inventory, performance, financials, breeding stats, health, analytics, alerts',
    path: '/farm-owner',
    color: 'bg-farm-700',
    gradient: 'from-farm-600 via-farm-700 to-farm-900',
    ring: 'ring-farm-400',
    emoji: '🏡',
  },
]

export interface NavItem {
  label: string
  path: string
  icon?: string
}

export function getRoleById(id: RoleId): RoleInfo | undefined {
  return ROLES.find((r) => r.id === id)
}

/** Roles users may self-register — Super Admin is login-only */
export const REGISTERABLE_ROLES = ROLES.filter((r) => r.id !== 'super-admin')

export function isRegisterableRole(roleId: RoleId): boolean {
  return roleId !== 'super-admin'
}
