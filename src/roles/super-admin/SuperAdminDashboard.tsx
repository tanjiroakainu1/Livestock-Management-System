import DashboardShell from '../../components/layout/DashboardShell'
import RoleDashboardGrid from '../../components/layout/RoleDashboardGrid'
import RoleFeatureList from '../../components/layout/RoleFeatureList'
import { SUPER_ADMIN_BASE, SUPER_ADMIN_FEATURES } from './config'

export default function SuperAdminDashboard() {
  return (
    <DashboardShell
      roleId="super-admin"
      title="Super Admin Dashboard"
      description="Full system access — manage users, settings, categories, records, reports, and data backup."
    >
      <RoleFeatureList features={SUPER_ADMIN_FEATURES} />
      <RoleDashboardGrid roleId="super-admin" basePath={SUPER_ADMIN_BASE} />
    </DashboardShell>
  )
}
