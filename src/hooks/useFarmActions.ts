import { useCallback } from 'react'
import { getFeatureByPath } from '../data/featureRegistry'
import {
  appendAudit,
  categoryInUse,
  findAnimal,
  newId,
  syncCategoryCounts,
} from '../lib/farmActions'
import { appendRoleActivity } from '../lib/roleActivity'
import { useAuth } from './useAuth'
import { useFarmData } from './useFarmData'
import type {
  BreedingRecord,
  FarmSettings,
  FarmTask,
  FeedingLog,
  FinancialRecord,
  InventoryItem,
  HealthCheckup,
  HealthRecord,
  Livestock,
  LivestockCategory,
  RoleActivityRecord,
  Transaction,
  Treatment,
  Vaccination,
} from '../types/farm'
import type { RoleId } from '../types/roles'

type ActivityAction = RoleActivityRecord['action']

export function useFarmActions(roleId: RoleId, featurePath: string) {
  const { updateData } = useFarmData()
  const { user } = useAuth()
  const userName = user?.fullName ?? 'System'
  const feature = getFeatureByPath(roleId, featurePath)

  const apply = useCallback(
    (
      updater: (data: import('../types/farm').FarmData) => import('../types/farm').FarmData,
      log: { action: ActivityAction; summary: string; referenceId?: string },
    ) => {
      if (!feature) {
        updateData(updater)
        return
      }
      updateData((d) => {
        let next = updater(d)
        next = appendRoleActivity(next, feature, {
          action: log.action,
          summary: log.summary,
          performedBy: userName,
          timestamp: new Date().toISOString(),
          referenceId: log.referenceId,
        })
        next = appendAudit(next, userName, log.action, log.summary)
        return next
      })
    },
    [feature, updateData, userName],
  )

  const logView = useCallback(() => {
    if (!feature) return
    apply(
      (d) => d,
      { action: 'View', summary: `Viewed ${feature.label}` },
    )
  }, [apply, feature])

  const addLivestock = useCallback(
    (animal: Omit<Livestock, 'id'>) => {
      const id = newId('lv')
      apply(
        (d) =>
          syncCategoryCounts({
            ...d,
            livestock: [{ ...animal, id }, ...d.livestock],
          }),
        {
          action: 'Create',
          summary: `Registered ${animal.tagNumber} — ${animal.name}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const updateLivestock = useCallback(
    (tag: string, patch: Partial<Livestock>) => {
      apply(
        (d) =>
          syncCategoryCounts({
            ...d,
            livestock: d.livestock.map((l) =>
              l.tagNumber === tag ? { ...l, ...patch } : l,
            ),
          }),
        {
          action: 'Update',
          summary: `Updated ${tag}: ${Object.keys(patch).join(', ')}`,
          referenceId: tag,
        },
      )
    },
    [apply],
  )

  const updateLivestockById = useCallback(
    (id: string, patch: Partial<Livestock>) => {
      apply(
        (d) =>
          syncCategoryCounts({
            ...d,
            livestock: d.livestock.map((l) =>
              l.id === id ? { ...l, ...patch } : l,
            ),
          }),
        {
          action: 'Update',
          summary: `Updated animal ${id}: ${Object.keys(patch).join(', ')}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const deleteLivestock = useCallback(
    (id: string) => {
      apply(
        (d) =>
          syncCategoryCounts({
            ...d,
            livestock: d.livestock.filter((l) => l.id !== id),
          }),
        {
          action: 'Delete',
          summary: `Removed livestock ${id}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const addCategory = useCallback(
    (cat: Omit<LivestockCategory, 'id' | 'animalCount'>) => {
      const id = newId('cat')
      apply(
        (d) =>
          syncCategoryCounts({
            ...d,
            categories: [...d.categories, { ...cat, id, animalCount: 0 }],
          }),
        { action: 'Create', summary: `Category added: ${cat.name}`, referenceId: id },
      )
    },
    [apply],
  )

  const updateCategory = useCallback(
    (id: string, patch: { name?: string; description?: string }) => {
      apply(
        (d) => {
          const cat = d.categories.find((c) => c.id === id)
          if (!cat) return d
          const oldName = cat.name
          const newName = patch.name?.trim() || oldName
          return syncCategoryCounts({
            ...d,
            categories: d.categories.map((c) =>
              c.id === id
                ? { ...c, ...patch, name: newName, description: patch.description ?? c.description }
                : c,
            ),
            livestock:
              newName !== oldName
                ? d.livestock.map((l) =>
                    l.category === oldName ? { ...l, category: newName } : l,
                  )
                : d.livestock,
          })
        },
        {
          action: 'Update',
          summary: `Category updated: ${patch.name ?? id}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const deleteCategory = useCallback(
    (id: string) => {
      apply(
        (d) => {
          const cat = d.categories.find((c) => c.id === id)
          if (!cat || categoryInUse(d, cat.name)) return d
          return syncCategoryCounts({
            ...d,
            categories: d.categories.filter((c) => c.id !== id),
          })
        },
        {
          action: 'Delete',
          summary: `Category removed: ${id}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const updateFarmSettings = useCallback(
    (settings: FarmSettings) => {
      apply(
        (d) => ({ ...d, farmSettings: settings }),
        { action: 'Update', summary: `Farm settings: ${settings.farmName}` },
      )
    },
    [apply],
  )

  const addHealthRecord = useCallback(
    (record: Omit<HealthRecord, 'id'>) => {
      const id = newId('hr')
      apply(
        (d) => ({
          ...d,
          healthRecords: [{ ...record, id }, ...d.healthRecords],
        }),
        {
          action: 'Create',
          summary: `Health: ${record.animalTag} — ${record.condition}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const updateHealthRecord = useCallback(
    (id: string, patch: Partial<HealthRecord>) => {
      apply(
        (d) => ({
          ...d,
          healthRecords: d.healthRecords.map((r) =>
            r.id === id ? { ...r, ...patch } : r,
          ),
        }),
        { action: 'Update', summary: `Health record ${id} updated`, referenceId: id },
      )
    },
    [apply],
  )

  const deleteHealthRecord = useCallback(
    (id: string) => {
      apply(
        (d) => ({
          ...d,
          healthRecords: d.healthRecords.filter((r) => r.id !== id),
        }),
        { action: 'Delete', summary: `Health record ${id} removed`, referenceId: id },
      )
    },
    [apply],
  )

  const addVaccination = useCallback(
    (vac: Omit<Vaccination, 'id'>) => {
      const id = newId('vac')
      apply(
        (d) => ({
          ...d,
          vaccinations: [{ ...vac, id }, ...d.vaccinations],
        }),
        {
          action: 'Create',
          summary: `Vaccination ${vac.vaccine} for ${vac.animalTag}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const updateVaccination = useCallback(
    (id: string, patch: Partial<Vaccination>) => {
      apply(
        (d) => ({
          ...d,
          vaccinations: d.vaccinations.map((v) =>
            v.id === id ? { ...v, ...patch } : v,
          ),
        }),
        { action: 'Update', summary: `Vaccination ${id} updated`, referenceId: id },
      )
    },
    [apply],
  )

  const deleteVaccination = useCallback(
    (id: string) => {
      apply(
        (d) => ({
          ...d,
          vaccinations: d.vaccinations.filter((v) => v.id !== id),
        }),
        { action: 'Delete', summary: `Vaccination ${id} removed`, referenceId: id },
      )
    },
    [apply],
  )

  const addCheckup = useCallback(
    (checkup: Omit<HealthCheckup, 'id'>) => {
      const id = newId('chk')
      apply(
        (d) => ({
          ...d,
          checkups: [{ ...checkup, id }, ...d.checkups],
        }),
        {
          action: 'Create',
          summary: `Checkup scheduled: ${checkup.animalTag}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const updateCheckup = useCallback(
    (id: string, patch: Partial<HealthCheckup>) => {
      apply(
        (d) => ({
          ...d,
          checkups: d.checkups.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        }),
        { action: 'Update', summary: `Checkup ${id} updated`, referenceId: id },
      )
    },
    [apply],
  )

  const deleteCheckup = useCallback(
    (id: string) => {
      apply(
        (d) => ({
          ...d,
          checkups: d.checkups.filter((c) => c.id !== id),
        }),
        { action: 'Delete', summary: `Checkup ${id} removed`, referenceId: id },
      )
    },
    [apply],
  )

  const addTreatment = useCallback(
    (treatment: Omit<Treatment, 'id'>) => {
      const id = newId('tr')
      apply(
        (d) => ({
          ...d,
          treatments: [{ ...treatment, id }, ...d.treatments],
        }),
        {
          action: 'Create',
          summary: `Treatment: ${treatment.diagnosis}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const updateTreatment = useCallback(
    (id: string, patch: Partial<Treatment>) => {
      apply(
        (d) => ({
          ...d,
          treatments: d.treatments.map((t) =>
            t.id === id ? { ...t, ...patch } : t,
          ),
        }),
        { action: 'Update', summary: `Treatment ${id} updated`, referenceId: id },
      )
    },
    [apply],
  )

  const deleteTreatment = useCallback(
    (id: string) => {
      apply(
        (d) => ({
          ...d,
          treatments: d.treatments.filter((t) => t.id !== id),
        }),
        { action: 'Delete', summary: `Treatment ${id} removed`, referenceId: id },
      )
    },
    [apply],
  )

  const completeTreatment = useCallback(
    (id: string) => {
      apply(
        (d) => ({
          ...d,
          treatments: d.treatments.map((t) =>
            t.id === id ? { ...t, status: 'Completed' as const } : t,
          ),
        }),
        { action: 'Update', summary: `Treatment completed: ${id}`, referenceId: id },
      )
    },
    [apply],
  )

  const addFeedingLog = useCallback(
    (log: Omit<FeedingLog, 'id'>) => {
      const id = newId('fd')
      apply(
        (d) => ({
          ...d,
          feedingLogs: [{ ...log, id }, ...d.feedingLogs],
        }),
        {
          action: 'Create',
          summary: `Feeding ${log.quantityKg}kg ${log.feedType} — ${log.animalTag}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const updateFeedingLog = useCallback(
    (id: string, patch: Partial<FeedingLog>) => {
      apply(
        (d) => ({
          ...d,
          feedingLogs: d.feedingLogs.map((f) => (f.id === id ? { ...f, ...patch } : f)),
        }),
        { action: 'Update', summary: `Feeding log ${id} updated`, referenceId: id },
      )
    },
    [apply],
  )

  const deleteFeedingLog = useCallback(
    (id: string) => {
      apply(
        (d) => ({
          ...d,
          feedingLogs: d.feedingLogs.filter((f) => f.id !== id),
        }),
        { action: 'Delete', summary: `Feeding log ${id} removed`, referenceId: id },
      )
    },
    [apply],
  )

  const addBreedingRecord = useCallback(
    (record: Omit<BreedingRecord, 'id'>) => {
      const id = newId('br')
      apply(
        (d) => ({
          ...d,
          breedingRecords: [{ ...record, id }, ...d.breedingRecords],
        }),
        {
          action: 'Create',
          summary: `Breeding ${record.femaleTag} × ${record.maleTag}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const updateBreedingRecord = useCallback(
    (id: string, patch: Partial<BreedingRecord>) => {
      apply(
        (d) => ({
          ...d,
          breedingRecords: d.breedingRecords.map((r) =>
            r.id === id ? { ...r, ...patch } : r,
          ),
        }),
        {
          action: 'Update',
          summary: `Breeding record ${id} updated`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const deleteBreedingRecord = useCallback(
    (id: string) => {
      apply(
        (d) => ({
          ...d,
          breedingRecords: d.breedingRecords.filter((r) => r.id !== id),
        }),
        { action: 'Delete', summary: `Breeding record ${id} removed`, referenceId: id },
      )
    },
    [apply],
  )

  const addTask = useCallback(
    (task: Omit<FarmTask, 'id'>) => {
      const id = newId('tk')
      apply(
        (d) => ({
          ...d,
          tasks: [{ ...task, id }, ...d.tasks],
        }),
        { action: 'Create', summary: `Task: ${task.title}`, referenceId: id },
      )
    },
    [apply],
  )

  const updateTaskStatus = useCallback(
    (id: string, status: FarmTask['status']) => {
      apply(
        (d) => ({
          ...d,
          tasks: d.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        }),
        { action: 'Update', summary: `Task ${id} → ${status}`, referenceId: id },
      )
    },
    [apply],
  )

  const updateTask = useCallback(
    (id: string, patch: Partial<FarmTask>) => {
      apply(
        (d) => ({
          ...d,
          tasks: d.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        }),
        { action: 'Update', summary: `Task ${id} updated`, referenceId: id },
      )
    },
    [apply],
  )

  const deleteTask = useCallback(
    (id: string) => {
      apply(
        (d) => ({
          ...d,
          tasks: d.tasks.filter((t) => t.id !== id),
        }),
        { action: 'Delete', summary: `Task ${id} removed`, referenceId: id },
      )
    },
    [apply],
  )

  const updateTransaction = useCallback(
    (id: string, status: Transaction['status']) => {
      apply(
        (d) => ({
          ...d,
          transactions: d.transactions.map((t) =>
            t.id === id ? { ...t, status } : t,
          ),
        }),
        {
          action: status === 'Approved' ? 'Approve' : 'Update',
          summary: `Transaction ${id} → ${status}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const reportSickAnimal = useCallback(
    (tag: string, notes: string) => {
      apply((d) => {
        const found = findAnimal(d, tag)
        if (!found) return d
        const hrId = newId('hr')
        const ntId = newId('nt')
        return {
          ...d,
          livestock: d.livestock.map((l) =>
            l.tagNumber === tag ? { ...l, status: 'Sick' as const } : l,
          ),
          healthRecords: [
            {
              id: hrId,
              animalTag: tag,
              animalName: found.name,
              date: new Date().toISOString().slice(0, 10),
              condition: 'Sick — reported',
              notes,
              recordedBy: userName,
            },
            ...d.healthRecords,
          ],
          notifications: [
            {
              id: ntId,
              title: 'Health alert',
              message: `${found.name} (${tag}) reported sick`,
              type: 'Health',
              date: new Date().toISOString().slice(0, 10),
              read: false,
            },
            ...d.notifications,
          ],
        }
      }, {
        action: 'Create',
        summary: `Sick report: ${tag}`,
        referenceId: tag,
      })
    },
    [apply, userName],
  )

  const markNotificationRead = useCallback(
    (id: string) => {
      apply(
        (d) => ({
          ...d,
          notifications: d.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        }),
        { action: 'Update', summary: `Notification read: ${id}`, referenceId: id },
      )
    },
    [apply],
  )

  const markAllNotificationsRead = useCallback(() => {
    apply(
      (d) => ({
        ...d,
        notifications: d.notifications.map((n) => ({ ...n, read: true })),
      }),
      { action: 'Update', summary: 'All notifications marked read' },
    )
  }, [apply])

  const addFinancial = useCallback(
    (record: Omit<FinancialRecord, 'id'>) => {
      const id = newId('fin')
      apply(
        (d) => ({
          ...d,
          financials: [{ ...record, id }, ...d.financials],
        }),
        {
          action: 'Create',
          summary: `${record.type} $${record.amount} — ${record.category}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const updateFinancial = useCallback(
    (id: string, patch: Partial<FinancialRecord>) => {
      apply(
        (d) => ({
          ...d,
          financials: d.financials.map((f) => (f.id === id ? { ...f, ...patch } : f)),
        }),
        {
          action: 'Update',
          summary: `Financial record ${id} updated`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const deleteFinancial = useCallback(
    (id: string) => {
      apply(
        (d) => ({
          ...d,
          financials: d.financials.filter((f) => f.id !== id),
        }),
        { action: 'Delete', summary: `Financial record ${id} removed`, referenceId: id },
      )
    },
    [apply],
  )

  const logExport = useCallback(() => {
    apply(
      (d) => d,
      { action: 'Export', summary: 'Data backup exported' },
    )
  }, [apply])

  const updateInventory = useCallback(
    (id: string, patch: Partial<InventoryItem>) => {
      apply(
        (d) => ({
          ...d,
          inventory: d.inventory.map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        }),
        {
          action: 'Update',
          summary: `Inventory ${id}: ${Object.keys(patch).join(', ')}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const addInventoryItem = useCallback(
    (item: Omit<InventoryItem, 'id'>) => {
      const id = newId('inv')
      apply(
        (d) => ({
          ...d,
          inventory: [{ ...item, id }, ...d.inventory],
        }),
        {
          action: 'Create',
          summary: `Inventory added: ${item.name}`,
          referenceId: id,
        },
      )
    },
    [apply],
  )

  const deleteInventory = useCallback(
    (id: string) => {
      apply(
        (d) => ({
          ...d,
          inventory: d.inventory.filter((item) => item.id !== id),
        }),
        { action: 'Delete', summary: `Inventory item ${id} removed`, referenceId: id },
      )
    },
    [apply],
  )

  const deleteRecordById = useCallback(
    (
      collection:
        | 'healthRecords'
        | 'vaccinations'
        | 'feedingLogs'
        | 'breedingRecords'
        | 'tasks'
        | 'transactions',
      id: string,
      label: string,
    ) => {
      apply(
        (d) => ({
          ...d,
          [collection]: (d[collection] as { id: string }[]).filter((r) => r.id !== id),
        }),
        { action: 'Delete', summary: `${label} ${id} removed`, referenceId: id },
      )
    },
    [apply],
  )

  const restoreFarmData = useCallback(
    (payload: import('../types/farm').FarmData) => {
      apply(() => payload, {
        action: 'Update',
        summary: 'System data restored from backup file',
      })
    },
    [apply],
  )

  const logAction = useCallback(
    (log: { action: ActivityAction; summary: string; referenceId?: string }) => {
      apply((d) => d, log)
    },
    [apply],
  )

  return {
    userName,
    feature,
    logView,
    logExport,
    logAction,
    addLivestock,
    updateLivestock,
    addCategory,
    updateCategory,
    deleteCategory,
    updateLivestockById,
    deleteLivestock,
    updateFarmSettings,
    addHealthRecord,
    updateHealthRecord,
    deleteHealthRecord,
    addVaccination,
    updateVaccination,
    deleteVaccination,
    addCheckup,
    updateCheckup,
    deleteCheckup,
    addTreatment,
    updateTreatment,
    deleteTreatment,
    completeTreatment,
    addFeedingLog,
    updateFeedingLog,
    deleteFeedingLog,
    addBreedingRecord,
    updateBreedingRecord,
    deleteBreedingRecord,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    updateTransaction,
    reportSickAnimal,
    markNotificationRead,
    markAllNotificationsRead,
    addFinancial,
    updateFinancial,
    deleteFinancial,
    updateInventory,
    addInventoryItem,
    deleteInventory,
    deleteRecordById,
    restoreFarmData,
  }
}
