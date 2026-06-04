import { useMemo } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { roleActivityColumns } from '../../data/tableColumns'
import DataTable from '../data/DataTable'
import type { RoleId } from '../../types/roles'

interface RoleActivityTableProps {
  roleId: RoleId
  featurePath?: string
  title?: string
}

export default function RoleActivityTable({
  roleId,
  featurePath,
  title = 'Role Activity Log — Purpose & Functionality',
}: RoleActivityTableProps) {
  const { data } = useFarmData()

  const rows = useMemo(() => {
    return (data.roleActivities ?? [])
      .filter((r) => r.roleId === roleId)
      .filter((r) => (featurePath ? r.featurePath === featurePath : true))
      .map((r) => ({ ...r }) as Record<string, unknown>)
  }, [data.roleActivities, roleId, featurePath])

  return (
    <DataTable
      columns={roleActivityColumns}
      data={rows}
      title={title}
      emptyMessage="No activity recorded yet. Use the form above to create records."
    />
  )
}
