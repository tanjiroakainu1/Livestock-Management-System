import DashboardShell from '../../components/layout/DashboardShell'
import RoleDashboardGrid from '../../components/layout/RoleDashboardGrid'
import RoleFeatureList from '../../components/layout/RoleFeatureList'
import { VETERINARIAN_BASE, VETERINARIAN_FEATURES } from './config'

export default function VeterinarianDashboard() {
  return (
    <DashboardShell
      roleId="veterinarian"
      title="Veterinarian Dashboard"
      description="Record health data, schedule checkups, manage vaccinations, treatments, and recovery."
    >
      <RoleFeatureList features={VETERINARIAN_FEATURES} />
      <RoleDashboardGrid roleId="veterinarian" basePath={VETERINARIAN_BASE} />
    </DashboardShell>
  )
}
