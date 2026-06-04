import { useMemo, type ReactNode } from 'react'
import DataTable, { type Column } from '../data/DataTable'
import StatGrid from '../data/StatGrid'
import SectionHeader from '../ui/SectionHeader'
import RoleActivityTable from './RoleActivityTable'
import { useFarmData } from '../../hooks/useFarmData'
import { getFeatureByPath } from '../../data/featureRegistry'
import type { RoleId } from '../../types/roles'

interface FeaturePageProps {
  roleId: RoleId
  featurePath: string
  title: string
  description: string
  stats?: { label: string; value: string | number }[]
  columns?: Column<Record<string, unknown>>[]
  data?: Record<string, unknown>[]
  children?: ReactNode
  actions?: ReactNode
  emptyMessage?: string
  badge?: string
  recordTableTitle?: string
  activityTableTitle?: string
  hideRecordTable?: boolean
  hideActivityTable?: boolean
}

export default function FeaturePage({
  roleId,
  featurePath,
  title,
  description,
  stats,
  columns,
  data,
  children,
  actions,
  emptyMessage,
  badge,
  recordTableTitle = 'Records',
  activityTableTitle,
  hideRecordTable = false,
  hideActivityTable = false,
}: FeaturePageProps) {
  const { data: farmData } = useFarmData()
  const feature = getFeatureByPath(roleId, featurePath)

  const recordData = useMemo(() => {
    if (data) return data
    if (!feature?.dataKey) return undefined
    const collection = farmData[feature.dataKey]
    if (Array.isArray(collection)) {
      return collection as unknown as Record<string, unknown>[]
    }
    return undefined
  }, [data, feature, farmData])

  const purposeLine = feature
    ? `Functionality: ${feature.functionality} · Purpose: ${feature.purpose}`
    : description

  return (
    <div className="page-stack page-content-enter w-full min-w-0 max-w-full">
      <SectionHeader title={title} description={purposeLine} badge={badge ?? feature?.systemArea} />
      {stats && stats.length > 0 && <StatGrid stats={stats} />}
      {actions}
      {children && <div className="page-stack w-full min-w-0">{children}</div>}
      {!hideRecordTable && columns && recordData && (
        <DataTable
          columns={columns}
          data={recordData}
          emptyMessage={emptyMessage}
          title={recordTableTitle}
        />
      )}
      {!hideActivityTable && (
        <RoleActivityTable
          roleId={roleId}
          featurePath={featurePath}
          title={
            activityTableTitle ??
            `${feature?.label ?? 'Feature'} — Role Activity (localStorage)`
          }
        />
      )}
    </div>
  )
}
