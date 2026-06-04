import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'
import { useFarmData } from '../../hooks/useFarmData'
import RoleQuickAccess from '../auth/RoleQuickAccess'
import UserProfileBanner from '../auth/UserProfileBanner'
import StatGrid from '../data/StatGrid'
import SectionHeader from '../ui/SectionHeader'
import RoleActivityTable from './RoleActivityTable'
import type { RoleId } from '../../types/roles'

interface DashboardShellProps {
  title: string
  description: string
  children: ReactNode
  roleId?: RoleId
}

export default function DashboardShell({
  title,
  description,
  children,
  roleId,
}: DashboardShellProps) {
  const { data } = useFarmData()

  const stats = [
    { label: 'Livestock', value: data.livestock.length },
    { label: 'Categories', value: data.categories.length },
    { label: 'Health Records', value: data.healthRecords.length },
    {
      label: 'Open Tasks',
      value: data.tasks.filter((t) => t.status !== 'Completed').length,
    },
  ]

  return (
    <div className="page-stack page-content-enter w-full min-w-0">
      <UserProfileBanner />
      <RoleQuickAccess />
      <StatGrid stats={stats} />
      <SectionHeader
        title={title}
        description={description}
        badge="Dashboard"
      >
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-farm-700 font-medium">
          <Sparkles className="h-4 w-4 text-hay-500" />
          Green Valley Farm · Live overview
        </p>
      </SectionHeader>
      {children}
      {roleId && (
        <RoleActivityTable
          roleId={roleId}
          title="Recent Role Activity — Purpose & Functionality (localStorage)"
        />
      )}
    </div>
  )
}
