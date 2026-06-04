import DashboardShell from '../../components/layout/DashboardShell'
import RoleDashboardGrid from '../../components/layout/RoleDashboardGrid'
import RoleFeatureList from '../../components/layout/RoleFeatureList'
import { CARETAKER_BASE, CARETAKER_FEATURES } from './config'

export default function CaretakerDashboard() {
  return (
    <DashboardShell
      roleId="livestock-caretaker"
      title="Livestock Caretaker Dashboard"
      description="Daily feeding, animal conditions, weight, housing, breeding activities, and farm tasks."
    >
      <RoleFeatureList features={CARETAKER_FEATURES} />
      <RoleDashboardGrid roleId="livestock-caretaker" basePath={CARETAKER_BASE} />
    </DashboardShell>
  )
}
