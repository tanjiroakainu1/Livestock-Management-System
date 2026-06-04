import DashboardShell from '../../components/layout/DashboardShell'
import RoleDashboardGrid from '../../components/layout/RoleDashboardGrid'
import RoleFeatureList from '../../components/layout/RoleFeatureList'
import { FARM_MANAGER_BASE, FARM_MANAGER_FEATURES } from './config'

export default function FarmManagerDashboard() {
  return (
    <DashboardShell
      roleId="farm-manager"
      title="Farm Manager Dashboard"
      description="Manage livestock, breeding, operations, transactions, and farm-level reporting."
    >
      <RoleFeatureList features={FARM_MANAGER_FEATURES} />
      <RoleDashboardGrid roleId="farm-manager" basePath={FARM_MANAGER_BASE} />
    </DashboardShell>
  )
}
