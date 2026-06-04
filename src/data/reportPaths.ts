import type { RoleId } from '../types/roles'

export type ReportScope =
  | 'farm-manager'
  | 'veterinarian'
  | 'farm-owner'
  | 'farm-owner-performance'
  | 'farm-owner-financials'
  | 'super-admin'

/** Paths that are chart-only report pages (no CRUD data tables) */
export const REPORT_ONLY_PATHS = new Set([
  'system-reports',
  'farm-reports',
  'health-reports',
  'reports-analytics',
])

export function getReportScope(roleId: RoleId): ReportScope | null {
  const map: Partial<Record<RoleId, ReportScope>> = {
    'farm-manager': 'farm-manager',
    veterinarian: 'veterinarian',
    'farm-owner': 'farm-owner',
    'super-admin': 'super-admin',
  }
  return map[roleId] ?? null
}
