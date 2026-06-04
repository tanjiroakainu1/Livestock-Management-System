import { useRef, useState, type ChangeEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import FeaturePage from '../../components/layout/FeaturePage'
import { auditColumns } from '../../data/tableColumns'
import { migrateFarmData } from '../../lib/storage'
import type { FarmData } from '../../types/farm'

export default function BackupAndRestore() {
  const { data } = useFarmData()
  const { logExport, restoreFarmData } = useFarmActions('super-admin', 'backup-restore')
  const fileRef = useRef<HTMLInputElement>(null)
  const [restoreMsg, setRestoreMsg] = useState<string | null>(null)
  const [restoreError, setRestoreError] = useState<string | null>(null)

  const downloadBackup = () => {
    logExport()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `green-valley-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleRestore = (e: ChangeEvent<HTMLInputElement>) => {
    setRestoreMsg(null)
    setRestoreError(null)
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Partial<FarmData>
        const restored = migrateFarmData(parsed)
        restoreFarmData(restored)
        setRestoreMsg('Backup restored successfully. All farm data reloaded from file.')
      } catch {
        setRestoreError('Invalid backup file. Upload a JSON export from this system.')
      }
      if (fileRef.current) fileRef.current.value = ''
    }
    reader.readAsText(file)
  }

  return (
    <FeaturePage
      roleId="super-admin"
      featurePath="backup-restore"
      title="Backup & Restore Data"
      description="Export or restore full system data including role activity logs."
      badge="Super Admin"
      stats={[
        { label: 'Livestock', value: data.livestock.length },
        { label: 'Health Records', value: data.healthRecords.length },
        { label: 'Audit Entries', value: data.auditLogs.length },
        { label: 'Role Activities', value: (data.roleActivities ?? []).length },
      ]}
      columns={auditColumns}
      data={data.auditLogs as unknown as Record<string, unknown>[]}
      recordTableTitle="Activity Monitoring & Audit Logs"
      actions={
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-bold text-earth-900 mb-2">Download System Backup</h3>
            <p className="text-sm text-earth-700/75 mb-4">
              Export all farm data, users session data excluded — stored as JSON in localStorage format.
            </p>
            <button type="button" onClick={downloadBackup} className="btn-primary">
              Download Backup File
            </button>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-bold text-earth-900 mb-2">Restore from Backup</h3>
            <p className="text-sm text-earth-700/75 mb-4">
              Upload a previously exported JSON backup to replace current farm data.
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              onChange={handleRestore}
              className="block w-full text-sm text-earth-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-farm-600 file:text-white file:font-semibold"
            />
            {restoreMsg && <p className="mt-3 text-sm text-farm-700 font-medium">{restoreMsg}</p>}
            {restoreError && <p className="mt-3 text-sm text-red-600 font-medium">{restoreError}</p>}
          </div>
        </div>
      }
    />
  )
}
