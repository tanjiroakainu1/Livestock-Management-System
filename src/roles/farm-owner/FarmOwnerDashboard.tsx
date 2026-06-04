import DashboardShell from '../../components/layout/DashboardShell'
import RoleDashboardGrid from '../../components/layout/RoleDashboardGrid'
import RoleFeatureList from '../../components/layout/RoleFeatureList'
import { FARM_OWNER_BASE, FARM_OWNER_FEATURES } from './config'

export default function FarmOwnerDashboard() {
  return (
    <DashboardShell
      roleId="farm-owner"
      title="Farm Owner Dashboard"
      description="View inventory, performance, financials, breeding, health, analytics, and notifications."
    >
      <RoleFeatureList features={FARM_OWNER_FEATURES} />
      <RoleDashboardGrid roleId="farm-owner" basePath={FARM_OWNER_BASE} />
    </DashboardShell>
  )
}
