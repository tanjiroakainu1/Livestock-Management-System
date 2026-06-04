import type { RoleId } from '../types/roles'
import type { FarmData } from '../types/farm'

export type FarmDataKey = keyof Omit<FarmData, 'farmSettings'>

export interface FeatureDefinition {
  key: string
  roleId: RoleId
  path: string
  label: string
  functionality: string
  purpose: string
  dataKey?: FarmDataKey
  systemArea: string
}

export const FEATURE_REGISTRY: FeatureDefinition[] = [
  // Super Admin
  { key: 'sa-users', roleId: 'super-admin', path: 'users-roles', label: 'Users & Roles', functionality: 'Manage all users and roles', purpose: 'User management and role-based access control', systemArea: 'User Management', dataKey: undefined },
  { key: 'sa-settings', roleId: 'super-admin', path: 'farm-settings', label: 'Farm Settings', functionality: 'Configure farm settings', purpose: 'System settings and farm configuration', systemArea: 'System Administration' },
  { key: 'sa-categories', roleId: 'super-admin', path: 'livestock-categories', label: 'Livestock Categories', functionality: 'Manage livestock categories', purpose: 'Livestock categorization', systemArea: 'Livestock Management', dataKey: 'categories' },
  { key: 'sa-records', roleId: 'super-admin', path: 'all-farm-records', label: 'All Farm Records', functionality: 'View all farm records', purpose: 'Full system access to operational data', systemArea: 'Reports & Analytics' },
  { key: 'sa-reports', roleId: 'super-admin', path: 'system-reports', label: 'System Reports', functionality: 'Generate system-wide reports', purpose: 'Financial and production reports', systemArea: 'Reports & Analytics' },
  { key: 'sa-backup', roleId: 'super-admin', path: 'backup-restore', label: 'Backup & Restore', functionality: 'Backup and restore data', purpose: 'Data backup and recovery', systemArea: 'System Administration', dataKey: 'auditLogs' },
  // Farm Manager
  { key: 'fm-livestock', roleId: 'farm-manager', path: 'livestock-records', label: 'Livestock Records', functionality: 'Manage livestock records', purpose: 'Animal registration and tag identification', systemArea: 'Livestock Management', dataKey: 'livestock' },
  { key: 'fm-locations', roleId: 'farm-manager', path: 'assign-locations', label: 'Assign Locations', functionality: 'Assign livestock to locations', purpose: 'Animal location tracking', systemArea: 'Livestock Management', dataKey: 'livestock' },
  { key: 'fm-performance', roleId: 'farm-manager', path: 'animal-performance', label: 'Animal Performance', functionality: 'Monitor animal performance', purpose: 'Age and weight tracking', systemArea: 'Livestock Management', dataKey: 'livestock' },
  { key: 'fm-breeding', roleId: 'farm-manager', path: 'breeding-schedules', label: 'Breeding Schedules', functionality: 'Manage breeding schedules', purpose: 'Mating schedules and pregnancy tracking', systemArea: 'Breeding Management', dataKey: 'breedingRecords' },
  { key: 'fm-operations', roleId: 'farm-manager', path: 'farm-operations', label: 'Farm Operations', functionality: 'Monitor farm operations', purpose: 'Task assignment and daily activity logs', systemArea: 'Farm Operations', dataKey: 'tasks' },
  { key: 'fm-transactions', roleId: 'farm-manager', path: 'approve-transactions', label: 'Approve Transactions', functionality: 'Approve livestock transactions', purpose: 'Livestock sales records', systemArea: 'Financial Management', dataKey: 'transactions' },
  { key: 'fm-reports', roleId: 'farm-manager', path: 'farm-reports', label: 'Farm Reports', functionality: 'Generate farm reports', purpose: 'Production and inventory reports', systemArea: 'Reports & Analytics' },
  // Veterinarian
  { key: 'vet-health', roleId: 'veterinarian', path: 'animal-health', label: 'Animal Health', functionality: 'Record animal health information', purpose: 'Medical history records', systemArea: 'Health Management', dataKey: 'healthRecords' },
  { key: 'vet-checkups', roleId: 'veterinarian', path: 'health-checkups', label: 'Health Checkups', functionality: 'Schedule health checkups', purpose: 'Health checkup scheduling', systemArea: 'Health Management', dataKey: 'checkups' },
  { key: 'vet-vaccines', roleId: 'veterinarian', path: 'vaccination-records', label: 'Vaccination Records', functionality: 'Manage vaccination records', purpose: 'Vaccination records and reminders', systemArea: 'Health Management', dataKey: 'vaccinations' },
  { key: 'vet-diagnose', roleId: 'veterinarian', path: 'diagnose-illness', label: 'Diagnose Illness', functionality: 'Diagnose and record illnesses', purpose: 'Disease monitoring', systemArea: 'Health Management' },
  { key: 'vet-treat', roleId: 'veterinarian', path: 'prescribe-treatments', label: 'Prescribe Treatments', functionality: 'Prescribe treatments', purpose: 'Treatment and medicine inventory', systemArea: 'Health Management', dataKey: 'treatments' },
  { key: 'vet-recovery', roleId: 'veterinarian', path: 'animal-recovery', label: 'Animal Recovery', functionality: 'Monitor animal recovery', purpose: 'Follow-up care and recovery tracking', systemArea: 'Health Management', dataKey: 'treatments' },
  { key: 'vet-reports', roleId: 'veterinarian', path: 'health-reports', label: 'Health Reports', functionality: 'Generate health reports', purpose: 'Veterinary reports', systemArea: 'Reports & Analytics' },
  // Livestock Caretaker
  { key: 'ct-feeding', roleId: 'livestock-caretaker', path: 'daily-feeding', label: 'Daily Feeding', functionality: 'Record daily feeding activities', purpose: 'Feed consumption and nutrition monitoring', systemArea: 'Feeding Management', dataKey: 'feedingLogs' },
  { key: 'ct-conditions', roleId: 'livestock-caretaker', path: 'animal-conditions', label: 'Animal Conditions', functionality: 'Monitor animal conditions', purpose: 'Daily health observation', systemArea: 'Health Management', dataKey: 'livestock' },
  { key: 'ct-weight', roleId: 'livestock-caretaker', path: 'weight-records', label: 'Weight Records', functionality: 'Update livestock weight records', purpose: 'Weight tracking', systemArea: 'Livestock Management', dataKey: 'livestock' },
  { key: 'ct-sick', roleId: 'livestock-caretaker', path: 'report-sick', label: 'Report Sick Animals', functionality: 'Report sick animals', purpose: 'Health alerts', systemArea: 'Notifications & Alerts', dataKey: 'healthRecords' },
  { key: 'ct-breeding', roleId: 'livestock-caretaker', path: 'breeding-activities', label: 'Breeding Activities', functionality: 'Record breeding activities', purpose: 'Breeding records', systemArea: 'Breeding Management', dataKey: 'breedingRecords' },
  { key: 'ct-housing', roleId: 'livestock-caretaker', path: 'housing-assignments', label: 'Housing Assignments', functionality: 'Manage animal housing assignments', purpose: 'Housing management', systemArea: 'Farm Operations', dataKey: 'livestock' },
  { key: 'ct-tasks', roleId: 'livestock-caretaker', path: 'daily-tasks', label: 'Daily Farm Tasks', functionality: 'Track daily farm tasks', purpose: 'Daily activity logs', systemArea: 'Farm Operations', dataKey: 'tasks' },
  // Farm Owner
  { key: 'fo-inventory', roleId: 'farm-owner', path: 'livestock-inventory', label: 'Livestock Inventory', functionality: 'Manage livestock inventory', purpose: 'Register, edit, and remove animals and categories', systemArea: 'Reports & Analytics', dataKey: 'livestock' },
  { key: 'fo-performance', roleId: 'farm-owner', path: 'farm-performance', label: 'Farm Performance', functionality: 'Monitor farm performance', purpose: 'Farm performance dashboards', systemArea: 'Reports & Analytics' },
  { key: 'fo-financials', roleId: 'farm-owner', path: 'financial-summaries', label: 'Financial Summaries', functionality: 'View financial summaries', purpose: 'Profit and loss summaries', systemArea: 'Financial Management' },
  { key: 'fo-breeding', roleId: 'farm-owner', path: 'breeding-statistics', label: 'Breeding Statistics', functionality: 'Track breeding statistics', purpose: 'Breeding reports', systemArea: 'Breeding Management', dataKey: 'breedingRecords' },
  { key: 'fo-health', roleId: 'farm-owner', path: 'health-records', label: 'Health Records', functionality: 'Monitor health records', purpose: 'Health reports', systemArea: 'Health Management' },
  { key: 'fo-notify', roleId: 'farm-owner', path: 'notifications', label: 'Farm Notifications', functionality: 'Receive farm notifications', purpose: 'Alerts and reminders', systemArea: 'Notifications & Alerts' },
  { key: 'fo-analytics', roleId: 'farm-owner', path: 'reports-analytics', label: 'Reports & Analytics', functionality: 'Review reports and analytics', purpose: 'Production reports', systemArea: 'Reports & Analytics' },
]

export function getFeatureByPath(roleId: RoleId, path: string): FeatureDefinition | undefined {
  return FEATURE_REGISTRY.find((f) => f.roleId === roleId && f.path === path)
}

export function getFeatureByKey(key: string): FeatureDefinition | undefined {
  return FEATURE_REGISTRY.find((f) => f.key === key)
}

export function getNavForRole(roleId: RoleId) {
  return FEATURE_REGISTRY.filter((f) => f.roleId === roleId).map((f) => ({
    label: f.label,
    path: f.path,
  }))
}

export function getRoleFunctionalities(roleId: RoleId): string[] {
  return getFeaturesForRole(roleId).map((f) => f.functionality)
}

/** Overall system capability areas (from product specification) */
export const SYSTEM_CAPABILITY_AREAS = [
  'User Management — registration, login, roles, profiles',
  'Livestock Management — registration, tags, breeds, weight, locations',
  'Health Management — vaccinations, checkups, disease, treatments',
  'Feeding Management — schedules, inventory, consumption, nutrition',
  'Breeding Management — mating, pregnancy, births, offspring',
  'Farm Operations — housing, movement, daily logs, tasks',
  'Financial Management — sales, expenses, revenue, profit & loss',
  'Inventory Management — feed, medicine, equipment, stock levels',
  'Notifications & Alerts — vaccination, health, feeding, breeding, stock',
  'Reports & Analytics — inventory, health, breeding, financial, dashboards',
  'System Administration — audit logs, settings, backup, monitoring',
] as const

export function getFeaturesForRole(roleId: RoleId): FeatureDefinition[] {
  return FEATURE_REGISTRY.filter((f) => f.roleId === roleId)
}

export function getFeatureData(
  data: FarmData,
  dataKey: FarmDataKey | undefined,
): Record<string, unknown>[] {
  if (!dataKey) return []
  const collection = data[dataKey]
  if (Array.isArray(collection)) {
    return collection as unknown as Record<string, unknown>[]
  }
  return []
}
