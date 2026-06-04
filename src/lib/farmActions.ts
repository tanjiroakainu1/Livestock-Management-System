import type { FarmData } from '../types/farm'

export function newId(prefix: string): string {
  return `${prefix}-${Date.now()}`
}

export function appendAudit(
  data: FarmData,
  userName: string,
  action: string,
  details: string,
): FarmData {
  return {
    ...data,
    auditLogs: [
      {
        id: newId('al'),
        action,
        user: userName,
        timestamp: new Date().toISOString(),
        details,
      },
      ...data.auditLogs,
    ],
  }
}

export function findAnimal(data: FarmData, tag: string) {
  return data.livestock.find(
    (l) => l.tagNumber.toLowerCase() === tag.trim().toLowerCase(),
  )
}

/** Keep category animalCount in sync with livestock — used after any category/livestock change */
export function syncCategoryCounts(data: FarmData): FarmData {
  return {
    ...data,
    categories: data.categories.map((c) => ({
      ...c,
      animalCount: data.livestock.filter((l) => l.category === c.name).length,
    })),
  }
}

export function categoryInUse(data: FarmData, categoryName: string): boolean {
  return data.livestock.some((l) => l.category === categoryName)
}
