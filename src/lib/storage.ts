import { SEED_FARM_DATA } from '../data/seedFarmData'
import type { FarmData } from '../types/farm'

export const STORAGE_KEYS = {
  farmData: 'lms_farm_data',
  users: 'lms_users',
  session: 'lms_session',
} as const

export function migrateFarmData(stored: Partial<FarmData> | null): FarmData {
  const seed = SEED_FARM_DATA
  if (!stored) return { ...seed }

  return {
    farmSettings: stored.farmSettings ?? seed.farmSettings,
    categories: stored.categories ?? seed.categories,
    livestock: stored.livestock ?? seed.livestock,
    healthRecords: stored.healthRecords ?? seed.healthRecords,
    vaccinations: stored.vaccinations ?? seed.vaccinations,
    checkups: stored.checkups ?? seed.checkups,
    treatments: stored.treatments ?? seed.treatments,
    feedingLogs: stored.feedingLogs ?? seed.feedingLogs,
    breedingRecords: stored.breedingRecords ?? seed.breedingRecords,
    tasks: stored.tasks ?? seed.tasks,
    transactions: stored.transactions ?? seed.transactions,
    financials: stored.financials ?? seed.financials,
    inventory: stored.inventory ?? seed.inventory,
    notifications: stored.notifications ?? seed.notifications,
    auditLogs: stored.auditLogs ?? seed.auditLogs,
    roleActivities: stored.roleActivities ?? seed.roleActivities ?? [],
  }
}

export function loadFarmDataFromStorage(): FarmData {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.farmData)
    if (raw) {
      return migrateFarmData(JSON.parse(raw) as Partial<FarmData>)
    }
  } catch {
    /* fall through */
  }
  const fresh = migrateFarmData(null)
  localStorage.setItem(STORAGE_KEYS.farmData, JSON.stringify(fresh))
  return fresh
}

export function saveFarmDataToStorage(data: FarmData): void {
  localStorage.setItem(STORAGE_KEYS.farmData, JSON.stringify(data))
}
